import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth-service/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public user_id: any;
  public messages:any;
  public newMessage!: string;
  public accountType:any
  public recipientId:any;
  selectedChat:any = [];
  users:any = []
  constructor(private authService: AuthService, private chatService: ChatService) {
    this.user_id = localStorage.getItem('user_id');
    this.accountType = localStorage.getItem('accountType');

  }

  ngOnInit() {


      this.chatService.getUsers().subscribe((users:any) => {
        this.users = users;
        if(this.accountType == 1) {
          this.users = this.users.filter((user:any)=>user.teacherId == this.user_id)
        }
        else {
          let currentUser:any = this.users.find((user:any)=>user.uid == this.user_id);
          if (currentUser) {
            this.users = this.users.filter((user:any)=>user.uid == currentUser.teacherId)
          }
        }
        
        console.log('users...........',this.users)
      })
      
  }

  sendMessage1(recipientId: string) {
    
  }

  selectChat(user_id:any){
    this.recipientId = user_id
    this.chatService.getMessages(this.user_id, this.recipientId).subscribe((message:any) => {
      this.messages = message;
      console.log('messages.........',message)
    })
  }
  sendMessage(){
    if (this.user_id && this.recipientId && this.newMessage) {
      this.chatService.sendMessage(this.user_id, this.recipientId, this.newMessage).then(() => {
        this.newMessage = '';
      });
    }
  }
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/user.svg'; // Set to default image
  }
}

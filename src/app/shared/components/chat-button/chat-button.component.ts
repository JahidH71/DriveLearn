import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.css']
})
export class ChatButtonComponent {

  constructor(private modalService: BsModalService){}
  chatToggle(): void {
    // Implement your logic for handling the day click event
    const modalRef: BsModalRef = this.modalService.show(ChatComponent,{ class: 'modal-lg' });
    
  }
}

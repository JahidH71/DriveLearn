import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit{
    user_id = localStorage.getItem('user_id');
    users:any
    studentList:any = []
    modalRef!: BsModalRef;
    isSubscribe: boolean = false
    constructor(private modalService: BsModalService,private mainService:MainService) {}
    ngOnInit(): void {
        this.getStudents()
    }
    openModal(index:any) {
      const initialState = {
        userInfo: this.studentList[index]
      }
      this.modalRef = this.modalService.show(ProfileComponent, {initialState});
    }
    getStudents() {
            this.mainService.getAllUsers().subscribe(users=>{
                this.users =  users
                console.log(users)
            })
            console.log(this.users)
            this.mainService.getSubscribedStudents(this.user_id).subscribe(data => {
                console.log(data)
              let usersList = data;
              this.studentList = usersList.map((student:any) => {
                const matchedUser = this.users.find((user:any) => user.uid == student.studentId);
                if (matchedUser) {
                    return {
                        ...matchedUser,
                        teacherId: student.teacherId // Adding teacherId to the result
                    };
                }
            });
            console.log('....',this.studentList)
    })
}
}

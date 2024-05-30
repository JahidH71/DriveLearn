import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit{
  selectedPayment:any;
  user_id = localStorage.getItem('user_id');
  lessonId: any;
  isDelete:any;
  users:any
  constructor(public bsModalRef: BsModalRef,private toastr: ToastrService,private mainService:MainService) {}
  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.mainService.getAllUsers().subscribe((user:any)=>{
      this.users = user
    })
  }
  cancel() {
    this.bsModalRef.hide();
  }
  bookLesson1() {
    this.mainService.bookLesson(this.user_id, this.lessonId).then(() => {
      // Optionally, you can show a success message or update the UI
      console.log('Lesson booked successfully');
      this.toastr.success('Congratulations your lesson has been booked.');
      this.cancel()
    });
  }
  bookLesson() {
    const lesson = {
      booked: true,
    };
    
    this.mainService.updateLesson(this.lessonId,lesson);
    let currentUser = this.users.find((user:any)=>user.uid == this.user_id)
    let bookedLesson = currentUser?.bookedLessons ? currentUser.bookedLessons : 0
    this.mainService.updateUserInfo(this.user_id, {bookedLesson: bookedLesson + 1}).then(() => {
      console.log('Profile updated successfully!');
    });
    this.cancel();
  }
  Delete() {
    const lesson = {
      booked: true,
      canceled: true
    };
    
    this.mainService.updateLesson(this.lessonId,lesson);
    this.cancel();
  }
}

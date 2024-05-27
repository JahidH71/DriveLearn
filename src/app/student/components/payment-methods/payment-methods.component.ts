import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent {
  selectedPayment:any;
  user_id = localStorage.getItem('user_id');
  lessonId: any;
  isDelete:any
  constructor(public bsModalRef: BsModalRef,private toastr: ToastrService,private mainService:MainService) {}

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
      status: true
    };
    
    this.mainService.updateLesson(this.lessonId,lesson);
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

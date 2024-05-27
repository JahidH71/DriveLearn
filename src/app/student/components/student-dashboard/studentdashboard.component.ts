import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  feedbackForm!: FormGroup;
  modalRef!: BsModalRef;
  user_id = localStorage.getItem('user_id');
  constructor(private formBuilder: FormBuilder,private mainService: MainService,private modalService: BsModalService,) { }
  subscribed:boolean = true;
  availableLessons:any = []
  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });
    this.getLessons()
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value); // You can submit the form data to your server or perform other actions here
    } else {
      // Handle form validation errors
      alert('Please fill out all fields.');
    }
  }
  openModal(id:any) {
    const initialState = {
      lessonId: id
    }
    console.log('initialstate....',initialState)
    this.modalRef = this.modalService.show(PaymentMethodsComponent, {initialState});
  }

  getLessons() {
    this.mainService.getAllLessonsForStudents(this.user_id).subscribe((lesson:any)=>{
      this.availableLessons = lesson
      console.log('availableLessons...',this.availableLessons)
    })
  }
  cancelBooking(id:any) {
    const initialState = {
      lessonId: id,
      isDelete: true
    }
    console.log('initialstate....',initialState)
    this.modalRef = this.modalService.show(PaymentMethodsComponent, {initialState});
  }

}

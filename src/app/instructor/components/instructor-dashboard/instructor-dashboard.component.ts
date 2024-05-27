import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethodsComponent } from 'src/app/student/components/payment-methods/payment-methods.component';
import { ModalComponent } from '../modal/modal.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit{
  feedbackForm!: FormGroup;
  modalRef!: BsModalRef;
  user_id:any = localStorage.getItem('user_id');
  userinfo:any;
  constructor(private mainService: MainService,private modalService: BsModalService,) { }
  subscribed:boolean = true;
  availableLessons:any = []
  ngOnInit(): void {
    this.getUserInfo()
    this.getAllLessons()
  }

  editModal(id:any) {
    const initialState = {
      lesson : this.availableLessons[id],
      isDelete: false
    };
    console.log('initialState..',initialState)
    this.modalRef = this.modalService.show(ModalComponent, {initialState});
  }
  createModal() {
    const initialState = {
      isDelete: false,
      createNew: true,
      lesson: {instructor_name:this.userinfo.displayName}
    };
    this.modalRef = this.modalService.show(ModalComponent, {initialState});
  }
  deleteModal(id:any) {
    const initialState = {
      lesson : this.availableLessons[id],
      isDelete: true
    };
    this.modalRef = this.modalService.show(ModalComponent, {initialState});
  }
  getAllLessons() {
    this.mainService.getAllLessonsForTeacher(this.user_id).subscribe((lesson:any)=>{
      this.availableLessons = lesson
    })
  }
  getUserInfo(){
    this.mainService.getUserInfo(this.user_id).subscribe((info)=>{
      this.userinfo = info;
    })
  }
}

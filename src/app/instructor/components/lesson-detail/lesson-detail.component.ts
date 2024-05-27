import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit{
  lessonDetail:any;
  modalRef!: BsModalRef;
  allAvailableLessons : any = []
  title:any = "Find Your Driving Instructor";
  rating:any;
  availableTime:any;
  zipCode:any
  isViewDetails:boolean = false
  postReview:boolean = false;
  user_id = localStorage.getItem('user_id');
  userinfo:any
  constructor(private modalService: BsModalService,private mainService: MainService) {}
  ngOnInit(): void {
    this.getUserInfo();
    this.getAllLessons()
  }
  viewDetail(id:any){
    this.isViewDetails = true;
    this.lessonDetail = this.allAvailableLessons[id]
  }
  addReview(id:any){
    this.viewDetail(id);
    this.postReview = true
  }
  updateProgress(id:any) {
    const initialState = {
      lesson : this.allAvailableLessons[id],
      isUpdateProgress: true
    };
    console.log('initialState....',initialState)
    this.modalRef = this.modalService.show(ModalComponent, {initialState});
  }

  getAllLessons() {
    this.mainService.getAllLessonsForTeacher(this.user_id).subscribe((lesson:any)=>{
      this.allAvailableLessons = lesson
    })
  }
  getUserInfo(){
    this.mainService.getUserInfo(this.user_id).subscribe((info)=>{
      this.userinfo = info;
    })
  }

}

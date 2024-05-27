import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit{
  lessonDetail:any;
  user_id = localStorage.getItem('user_id')
  allAvailableLessons : any = []
  title:any = "Find Your Driving Instructor";
  rating:any;
  availableTime:any;
  zipCode:any
  isViewDetails:boolean = false;
  comments:any
  postReview:boolean = false;
  constructor(private mainService: MainService){}
  ngOnInit(): void {
    this.getLessons()
  }
  viewDetail(id:any){
    this.isViewDetails = true;
    this.lessonDetail = this.allAvailableLessons[id]
    console.log('this.lessonDetail....',this.lessonDetail)
  }
  addReview(id:any){
    this.viewDetail(id);
    this.postReview = true
  }

  getLessons() {
    this.mainService.getAllLessonsForStudents(this.user_id).subscribe((lesson:any)=>{
      this.allAvailableLessons = lesson
      console.log('availableLessons...',this.allAvailableLessons)
    })
  }
  postFeedback() {
    const feedback = {
      lessonId: this.lessonDetail.id,
      teacherId: this.lessonDetail.teacherId,
      studentId: this.lessonDetail.teacherId,
      rating: this.rating,
      comment: this.comments,
      date: new Date()
    };

    this.mainService.submitFeedback(feedback).then(() => {
      console.log('Feedback submitted successfully');
      this.rating = 0;
      this.comments = '';
    });
  }
  changeRating(change:any){
    console.log(change)
  }
}

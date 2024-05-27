import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-student-review',
  templateUrl: './student-review.component.html',
  styleUrls: ['./student-review.component.css']
})
export class StudentReviewComponent implements OnInit{
  user_id = localStorage.getItem('user_id');
  title:any = "Reviews";
  allReviews:any
  users:any;
  constructor(private mainService: MainService){}
  ngOnInit(): void {
    this.getReviews()
  }

  getReviews() {
    this.mainService.getAllUsers().subscribe(users=>{
      this.users =  users
      console.log(users);
      this.mainService.getFeedbackForTeacher(this.user_id).subscribe(feedbacks=>{
        let allFeedback = feedbacks
        this.allReviews = allFeedback.map((feedback:any)=>{
          const matchedUser = this.users.find((user:any)=> user.uid == feedback.studentId);
          if(matchedUser) {
            return {
              ...matchedUser,
              ...feedback
            }
          }
        });
        console.log('this.allReviews...',this.allReviews)
      })
  })
    
  }
}

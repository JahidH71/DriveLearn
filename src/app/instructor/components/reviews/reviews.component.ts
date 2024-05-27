import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{
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
  range(count: any) {
    count = Number(count)
    if (count <= 0) {
      throw new Error('range() function: count must be a positive number');
    }
    return Array.from({ length: count }, (_, i) => i);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-find-instructor',
  templateUrl: './find-instructor.component.html',
  styleUrls: ['./find-instructor.component.css']
})
export class FindInstructorComponent {
  location:any;
  timing:any;
  rating:any
//   searchedResults:any = [
//     {
//     lesson_no: 1,
//     instructor_name: "John Doe",
//     date: "May 2, 2024",
//     time: "11:00 AM",
//     cost: '30$',
// status: 0,
//     lesson_type: "Theoretical",
//     description:'This is the description for the lesson',
//     rating: '5',
// location: 'house no 2 , street no: 4 , London'
//     },
//     {
//     lesson_no: 2,
//     instructor_name: "John Lee",
//     date: "May 4, 2024",
//     time: "11:00 AM",
//     cost: '30$',
// status: 0,
//     lesson_type: "Theoretical",
//     description:'This is the description for the lesson',
//     rating: '4',
// location: 'house no 2 , street no: 4 , Manchester'
//     },
//     {
//     lesson_no: 3,
//     instructor_name: "John Doe",
//     date: "May 5, 2024",
//     time: "11:00 AM",
//     cost: '30$',
// status: 0,
//     lesson_type: "Practical",
//     description:'This is the description for the lesson',
//     rating: '4',
// location: 'house no 2 , street no: 4 , London'
//     },
    
//     ]
  user_id: any = 0; 
  searchedResults: any = []
  modalRef!: BsModalRef;
  isSubscribe: boolean = false;
  displayText:any = 'Find your Instructor accroring to your need.'
  constructor(private modalService: BsModalService,private route:Router, private mainService: MainService) {
    this.user_id = localStorage.getItem('user_id')
  }

  openModal(index:any) {
    const initialState = {
      userInfo: this.searchedResults[index]
    }
    this.modalRef = this.modalService.show(ProfileComponent, {initialState});
  }

  // subscribe(id:any){
  //   this.isSubscribe = true;
  //   this.route.navigateByUrl("/student")
  // }
  // getFilteredInstructor1(){
  //   this.searchedResults = this.mainService.getAllUsers().pipe(
  //     map((users:any) => {
  //       return users.filter((user:any) => {

  //         const locationMatch = this.searchList.location ? user.location.city.toLowerCase().includes(this.searchList.location.toLowerCase()) : '';
  //         const ratingMatch = this.searchList.rating ? user.rating >= this.searchList.rating : '';
  //         const timingMatch = this.searchList.timing ? user.availableTimes?.includes(this.searchList.timing) : '';

  //         return locationMatch && ratingMatch && timingMatch;
  //       });
  //     })
  //   );
  // }

  getFilteredInstructor() {
    if(this.location || this.rating || this.timing){
      // this.mainService.getAllUsers().subscribe(
      //   (user:any)=>{
      //     this.mainService.getFilteredInstructor(user,this.location, this.rating, this.timing).subscribe((user:any) => {
      //       this.searchedResults = user
      //     })
      //   }
      // )
      
      this.mainService.getAllUsers().subscribe(users => {
        console.log(users)
        this.searchedResults = this.mainService.getFilteredInstructor(users,this.location, this.rating, this.timing);
        if (this.searchedResults.length == 0) {
          this.displayText = "Can not find any Instructor."
        }
        console.log(this.searchedResults)
      });
    }
  }
  subscribeToTeacher(id:any) {
      this.mainService.subscribeToTeacher(this.user_id,id);
      this.mainService.updateUserInfo(this.user_id,{teacherId:id})
      this.route.navigateByUrl("/student")
  }
  
}

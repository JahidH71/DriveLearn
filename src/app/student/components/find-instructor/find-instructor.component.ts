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

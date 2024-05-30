import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isInstructor:any;
  modalRef!: BsModalRef;
  isSubscribed:any
  constructor(private router:Router,private modalService: BsModalService,) {
    this.isSubscribed = localStorage.getItem('teacherId');
  }
  navigateToHome() {
    if(this.isInstructor) this.router.navigate(['/instructor']);
    else this.router.navigate(['/student']);
  }

  opneProfileModal(){
    const initialState = {
      fromheader : true
    };
    this.modalRef = this.modalService.show(ProfileComponent, { initialState });
  }
  navigateToLessonHistory() {
    if(this.isInstructor) this.router.navigate(['/instructor/lesson']);
    else this.router.navigate(['/student/lesson']);
  }

  navigateToInstructorSearch() {
    if(this.isInstructor) this.router.navigate(['/instructor/']);
    else this.router.navigate(['/student/find']);
  }
  navigateToNotifications() {
    if(this.isInstructor) this.router.navigate(['/instructor/notification']);
    else this.router.navigate(['/student/notification']);
  }
  navigateToMyReview() {
    if(this.isInstructor) this.router.navigate(['/instructor/review']);
    else this.router.navigate(['/student/review']);
  }
  navigateToAllStudents() {
    if(this.isInstructor) this.router.navigate(['/instructor/students']);
  }
  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('accountType');
    localStorage.removeItem('authToken');
    if(this.isInstructor) this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-find-instructor',
  templateUrl: './find-instructor.component.html',
  styleUrls: ['./find-instructor.component.css']
})
export class FindInstructorComponent {
  title:any = "Find Your Driving Instructor";
  rating:any;
  availableTime:any;
  zipCode:any
}

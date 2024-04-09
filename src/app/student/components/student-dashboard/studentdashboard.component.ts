import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  feedbackForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value); // You can submit the form data to your server or perform other actions here
    } else {
      // Handle form validation errors
      alert('Please fill out all fields.');
    }
  }
}

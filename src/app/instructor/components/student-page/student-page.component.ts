import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit{
  progressForm!: FormGroup
  title:any = "Student Progess"
  constructor(private fb: FormBuilder){
    this.progressForm = this.fb.group({
      lessonRecap: ['', Validators.required],
      nextLesson: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    
  }
  updateProgress(){
    if(this.progressForm.valid){
      console.log(this.progressForm.value)
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindInstructorComponent } from './components/find-instructor/find-instructor.component';
import { StudentReviewComponent } from './components/student-review/student-review.component';
import { StudentdashboardComponent } from './components/student-dashboard/studentdashboard.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';


@NgModule({
  declarations: [
    MainComponent,
    FindInstructorComponent,
    StudentReviewComponent,
    StudentdashboardComponent,
    LessonDetailComponent,
    PaymentMethodsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StudentModule { }

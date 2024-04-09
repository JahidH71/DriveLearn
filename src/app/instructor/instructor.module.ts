import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonSchedulingComponent } from './components/lesson-scheduling/lesson-scheduling.component';
import { ReviewsComponent } from './components/reviews/reviews.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    StudentPageComponent,
    LessonSchedulingComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstructorModule { }

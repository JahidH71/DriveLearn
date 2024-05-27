import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';


@NgModule({
  declarations: [
    LessonDetailComponent,
    MainComponent,
    StudentPageComponent,
    ReviewsComponent,
    InstructorDashboardComponent,
    ModalComponent,
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

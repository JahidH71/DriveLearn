import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FindInstructorComponent } from './components/find-instructor/find-instructor.component';
import { StudentReviewComponent } from './components/student-review/student-review.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'review', component: StudentReviewComponent},
  {path:'find', component: FindInstructorComponent},
  {path:'lesson', component: LessonDetailComponent},
  {path:'notification', component: NotificationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

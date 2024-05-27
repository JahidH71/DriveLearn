import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'students', component: StudentPageComponent},
  {path:'review', component: ReviewsComponent},
  {path:'lesson', component: LessonDetailComponent},
  {path:'notification', component: NotificationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }

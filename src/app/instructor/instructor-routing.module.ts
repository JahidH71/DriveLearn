import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { LessonSchedulingComponent } from './components/lesson-scheduling/lesson-scheduling.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'student/:id', component: StudentPageComponent},
  {path:'schedule/:id', component: LessonSchedulingComponent},
  {path:'reviews', component: ReviewsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }

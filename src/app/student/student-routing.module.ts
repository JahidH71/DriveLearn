import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BookLessonComponent } from './components/book-lesson/book-lesson.component';
import { FindInstructorComponent } from './components/find-instructor/find-instructor.component';
import { StudentReviewComponent } from './components/student-review/student-review.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'book',component:BookLessonComponent},
  {path:'find', component:FindInstructorComponent},
  {path:'review', component: StudentReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'student',loadChildren: ()=>import('./student/student.module').then(m=>m.StudentModule)},
  {path: 'instructor', loadChildren: ()=>import('./instructor/instructor.module').then(m=>m.InstructorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

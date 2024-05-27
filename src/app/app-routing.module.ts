import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/general-guard/auth.guard';
import { StudentGuard } from './shared/guards/student-guard/student.guard';
import { InstructorGuard } from './shared/guards/instructor-guard/instructor.guard';

const routes: Routes = [
  {path:'',loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'student',loadChildren: ()=>import('./student/student.module').then(m=>m.StudentModule),
    canActivate: [AuthGuard, StudentGuard] 
  },
  {path: 'instructor', loadChildren: ()=>import('./instructor/instructor.module').then(m=>m.InstructorModule),
    canActivate: [AuthGuard, InstructorGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { GetStudentComponent } from './components/get-student/get-student.component';
import { GetStudentByIdComponent } from './components/get-student-by-id/get-student-by-id.component';
import { UpdateStudentByIdComponent } from './components/update-student-by-id/update-student-by-id.component';

const routes: Routes = [
  {path: 'addStudent', component:AddStudentComponent},
  {path: 'getStudents', component:GetStudentComponent},
  {path: 'getStudents/:id', component:GetStudentComponent},
  {path: 'getStudent/:id', component:GetStudentByIdComponent},
  {path: 'updateStudent/:id', component:UpdateStudentByIdComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

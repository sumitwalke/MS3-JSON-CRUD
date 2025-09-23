import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { GetStudentComponent } from './components/get-student/get-student.component';
import { GetStudentsComponent } from './components/get-students/get-students.component';

const routes: Routes = [
  {path: 'addStudent', component: AddStudentComponent},
  {path: 'addStudent/:id', component: AddStudentComponent},  //For Add and Update in one component
  {path: 'getStudent', component: GetStudentComponent},
  {path: 'getStudents', component: GetStudentsComponent},
  {path: 'getStudents/:id', component: GetStudentsComponent}, //Deleting student by id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

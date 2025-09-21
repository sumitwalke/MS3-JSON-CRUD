import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetStudentComponent } from './components/get-student/get-student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { GetStudentByIdComponent } from './components/get-student-by-id/get-student-by-id.component';
import { UpdateStudentByIdComponent } from './components/update-student-by-id/update-student-by-id.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipePipe } from './pipes/date-pipe.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GetStudentComponent,
    AddStudentComponent,
    GetStudentByIdComponent,
    UpdateStudentByIdComponent,
    DatePipePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private http: HttpClient){ }

  apiUrl = "https://ec2-15-207-19-107.projects.wecreateproblems.com/proxy/3000/students";

  addStudent(student: Student):Observable<Student>{
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: String):Observable<Student>{
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  deleteStudentById(id: String):Observable<Student>{
    return this.http.delete<Student>(`${this.apiUrl}/${id}`);
  }

  updateStudent(id: String, student: Student):Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }
}

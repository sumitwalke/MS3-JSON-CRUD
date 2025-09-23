import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://ec2-3-109-211-48.projects.wecreateproblems.com/proxy/3000/students';

  constructor(private http: HttpClient) { }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: string): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + "/" + id).pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data;
        }
        else return [data];
      })
    );
  }

  getStudentNormal(id: string): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + "/" + id)
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(this.apiUrl+"/"+id, student);
  }

  deleteStudent(id: string): Observable<Student> {
    return this.http.delete<Student>(this.apiUrl+"/"+id);
  }

}

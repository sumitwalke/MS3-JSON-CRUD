import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-get-student',
  templateUrl: './get-student.component.html',
  styleUrls: ['./get-student.component.css']
})
export class GetStudentComponent implements OnInit {
  student$: Observable<Student[]> = of([]);   //When the service sends Observable Array datatype
  student!: Student[];   //When the service sends Observale Student datatype

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id'];
      this.getStudent(id);
      this.getStudentNormal(id);
    })
  }

  getStudent(id: string) {
    if (id) {
      this.student$ = this.studentService.getStudent(id);
    }
  }

  getStudentNormal(id: string) {
    if (id) {
      this.studentService.getStudent(id).subscribe((data) => {
        this.student = data;
      });
    }
  }
}

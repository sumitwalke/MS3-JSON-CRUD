import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-get-students',
  templateUrl: './get-students.component.html',
  styleUrls: ['./get-students.component.css']
})
export class GetStudentsComponent implements OnInit {

  students$: Observable<Student[]> = of([]);
  filteredStudents$: Observable<Student[]> = of([]);

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id'];
      if (id) {
        this.deleteStudent(id);
      }
      this.getStudents();
    })
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.router.navigate(['/getStudents']);
    })
  }

  getStudents() {
    this.students$ = this.studentService.getStudents();
    this.filteredStudents$ = this.students$.pipe(
      map((students) =>
        students.sort((a: Student, b: Student) =>
          a.name.localeCompare(b.name)
        )
      )
    )

    this.filteredStudents$.pipe(toArray());
    this.filteredStudents$.subscribe((students) => {
      if (students) {
        localStorage.setItem('students', JSON.stringify(students));
      }
    })
  }

  searchStudent(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm === '' || !searchTerm) {
      this.filteredStudents$ = this.students$;
    }
    else {
      this.filteredStudents$ = this.students$.pipe(
        map((students) =>
          students.filter((student: Student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
    }

  }
}

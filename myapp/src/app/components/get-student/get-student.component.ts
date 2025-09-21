import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-get-student',
  templateUrl: './get-student.component.html',
  styleUrls: ['./get-student.component.css']
})
export class GetStudentComponent implements OnInit {

  data$: Observable<Student[]> = of([]);
  filteredStudents$: Observable<Student[]> = of([]);

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.deleteStudent(id);
    }
    this.getStudents();
  }

  getStudents() {
    this.data$ = this.studentService.getStudents();
    this.filteredStudents$ = this.data$.pipe(map((students) =>
      students.sort((a: Student, b: Student) => a.name.localeCompare(b.name))
    ))
    
    this.filteredStudents$.pipe(toArray());
    this.filteredStudents$.subscribe((students)=>{
      if(students){
        localStorage.setItem( 'students',JSON.stringify(students));
      }
    })
  }

  searchStudents(event: any) {
    const value = event.target.value;
    console.log(value);

    if (!value || value == '') {
      this.filteredStudents$ = this.data$;
      return;
    } else {
      this.filteredStudents$ = this.data$.pipe(map((students) => {
        return students.filter((student) =>
          // (student.name.includes(value) || student.email.includes(value) || student.name.toLowerCase().includes(value) || student.email.toLowerCase().includes(value))
          (student.name.toLowerCase().includes(value.toLowerCase()))
        )
      }))
    }
  }

  deleteStudent(id: string) {
    if (id) {
      this.studentService.deleteStudentById(id).subscribe((data) => {
        this.router.navigate(['/getStudents'])
      });
    }
  }
}

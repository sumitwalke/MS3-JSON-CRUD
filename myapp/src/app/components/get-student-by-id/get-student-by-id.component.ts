import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-get-student-by-id',
  templateUrl: './get-student-by-id.component.html',
  styleUrls: ['./get-student-by-id.component.css']
})
export class GetStudentByIdComponent implements OnInit{

  student!: Student;

  constructor(private studentService: StudentService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'))
    if(id){
      this.getStudentById(id);
    }
  }

  getStudentById(id: string){
    this.studentService.getStudentById(id).subscribe((data)=>{
      this.student = data;
    })
  }
}

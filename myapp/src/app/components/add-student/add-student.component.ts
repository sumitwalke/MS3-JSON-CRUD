import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, toArray } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{

  formGroup! : FormGroup;
  successMessage = '';
  errorMessage = '';
  success = false;

  data$: Observable<Student[]> = of([]);

  constructor(private formBuiler: FormBuilder, private studentService: StudentService, private router: Router){}

  ngOnInit(): void {
    this.formGroup = this.formBuiler.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      email: ['',[ Validators.required, Validators.email, this.emailValidator]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      salary: ['',[ Validators.required, this.salaryValidator]]
    })
  }

  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null{
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(control.value)){
      return {invalidDate: true};
    }else {
      return null;
    }
  }

  salaryValidator(control: AbstractControl) : ValidationErrors | null{
    if(control.value<0){
      return {invalidSalary: true};
    }
    return null;
  }

  emailValidator(control: AbstractControl): ValidationErrors | null{
    const studentEmail = control.value;
    let storedData = JSON.parse(localStorage.getItem('students') || '{}');
    if(Array.isArray(storedData)){
      const studentEmails = storedData.map((student: Student)=> student.email); 
      if(studentEmails.includes(studentEmail)){
        return {invalidEmail: true};
      }
    }
    return null;
  }


  addStudent(){
    if(this.formGroup.valid){
      this.studentService.addStudent(this.formGroup.value).subscribe((data)=>{
        this.successMessage = 'Added Student successfully';
        this.formGroup.reset();
        this.router.navigate(['/getStudents']);
      });
    }else{
      this.errorMessage = 'Failed to add Student';
    }
  }
}

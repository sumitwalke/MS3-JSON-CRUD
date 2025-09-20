import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  constructor(private formBuiler: FormBuilder, private studentService: StudentService){}

  ngOnInit(): void {
    this.formGroup = this.formBuiler.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      email: ['',[ Validators.required, Validators.email]],
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


  addStudent(){
    if(this.formGroup.valid){
      this.studentService.addStudent(this.formGroup.value).subscribe((data)=>{
        this.successMessage = 'Added Student successfully';
        this.formGroup.reset();
      });
    }else{
      this.errorMessage = 'Failed to add Student';
    }
  }
}

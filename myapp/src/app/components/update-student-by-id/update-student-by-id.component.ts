import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-update-student-by-id',
  templateUrl: './update-student-by-id.component.html',
  styleUrls: ['./update-student-by-id.component.css']
})
export class UpdateStudentByIdComponent implements OnInit{

  formGroup! : FormGroup;

  constructor(private formBuiler: FormBuilder, private studentService: StudentService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id){
      this.studentService.getStudentById(id).subscribe((data)=>{
        this.formGroup.patchValue(data);
      })
    }

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


  updateStudent(){
    if(this.formGroup.valid){
      this.studentService.addStudent(this.formGroup.value);
    }
  }

}

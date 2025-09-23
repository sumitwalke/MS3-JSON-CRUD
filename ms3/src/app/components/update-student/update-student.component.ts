import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  formGroup!: FormGroup;
  isFollowUp: boolean = false;
  isUpdate: boolean = false;
  grades = ['A', 'B', 'C'];
  updateId!: string;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((param) => {
      this.updateId = param['id'];
    })
    if (this.updateId) {
      this.getStudent(this.updateId);
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email, this.uniqueEmailValidator]],
      dob: ['', [Validators.required, this.dateValidator]],
      contact: ['',[ Validators.required, this.contactValidator]],
      code: ['', [Validators.required, this.codeValidator]],
      grade: [this.grades[0], [Validators.required]],
      id: [null],
    })
  }

  getStudent(id: string) {
    this.studentService.getStudent(id).subscribe((data) => {
      var student = data[0];
      // this.formGroup.patchValue({
      //   name: student.name,
      //   email: student.email,
      //   dob: student.dob,
      //   code: student.code,
      //   contact: student.contact,
      //   grade: student.grade,
      //   id: student.id,
      // })

      this.formGroup.patchValue(student);
    })
  }

  onChange(e: any) {
    if (e.target.value == "Follow-up") {
      this.isFollowUp = true;
    } else {
      this.isFollowUp = false;
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.studentService.updateStudent(this.updateId, this.formGroup.value).subscribe(() => {
        this.formGroup.reset();
        this.router.navigateByUrl('addStudent');
      })
    }
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }

  contactValidator(control: AbstractControl): ValidationErrors | null {
    const contactRegex = /^(\+)?(\d{10,15})$/;
    if (!contactRegex.test(control.value)) {
      return { invalidContact: true };
    }
    return null;
  }

  codeValidator(control: AbstractControl): ValidationErrors | null {
    const codeRegex = /^[AB].*/;
    if (!codeRegex.test(control.value)) {
      return { invalidCode: true };
    }
    return null;
  }

  uniqueEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    let data = JSON.parse(localStorage.getItem('students') || '{}');
    if (Array.isArray(data)) {
      let studentEmails = data.map((student: Student) => student.email);
      if (studentEmails.includes(email)) {
        return { invalidEmail: true };
      }
    }
    return null;
  }
}

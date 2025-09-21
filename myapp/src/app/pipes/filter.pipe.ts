import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: Student[], searchTerm: String): Student[] {
    if (!students) return [];
    if (!searchTerm) return students;

    // return students.filter((student) => {
    //   return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     student.email.toLowerCase().includes(searchTerm.toLowerCase())
    // });

    return students.filter((student)=> student.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  }

}

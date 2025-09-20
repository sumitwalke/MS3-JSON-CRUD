import { Pipe, PipeTransform } from '@angular/core';
// import { format, parseISO } from 'date-fns';
@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: String){
    // if(!value) {
    //   return "Invalid Date";
    // } else {
    //   try {
    //     const parsedDate = parseISO(value);
    //     return format(parsedDate, 'MMMM dd, yyyy');
    //   } catch (error) {
    //     return "Invalid Date";
    //   }
    // }
  }

}

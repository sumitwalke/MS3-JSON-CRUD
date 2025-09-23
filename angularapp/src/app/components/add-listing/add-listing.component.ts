import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Listing } from 'src/app/models/listing';
import { ListingService } from 'src/app/serivces/listing.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit{

  formGroup! : FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private listingService: ListingService){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['',[ Validators.required, this.titleValidator]],
      agent: ['',[ Validators.required]],
      description: ['',[ Validators.required]],
      // area: ['',[ Validators.required]],
      // propertyRating: ['',[ Validators.required]],
      // userRating: ['',[ Validators.required]],
    })
  }

  addListing(){
    if(this.formGroup.valid){
      this.listingService.addListing(this.formGroup.value);
      this.formGroup.reset();
    }
  }

  dateValidator(control: AbstractControl):ValidationErrors | null{
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(control.value)){
      return {ivalidDate: true};
    }
    return null;
  }

  titleValidator(formGroup: FormGroup): ValidationErrors | null{
    const title = formGroup.controls['title'].value;
    let storedData = JSON.parse(localStorage.getItem('listings') || '{}');
    if(Array.isArray(storedData)){
      const listingTitles = storedData.map((listing)=> listing.title);
      if(listingTitles.includes(title)){
        return {invalidTitle: true};
      }
    }
    return null;
  }
}

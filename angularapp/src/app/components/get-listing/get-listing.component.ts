import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Listing } from 'src/app/models/listing';
import { ListingService } from 'src/app/serivces/listing.service';

@Component({
  selector: 'app-get-listing',
  templateUrl: './get-listing.component.html',
  styleUrls: ['./get-listing.component.css']
})
export class GetListingComponent implements OnInit{

  constructor(private listingService: ListingService){}

  ngOnInit(): void {
    
  }
 
}

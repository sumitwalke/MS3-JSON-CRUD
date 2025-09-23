import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, toArray } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Listing } from 'src/app/models/listing';
import { ListingService } from 'src/app/serivces/listing.service';

@Component({
  selector: 'app-get-listings',
  templateUrl: './get-listings.component.html',
  styleUrls: ['./get-listings.component.css']
})
export class GetListingsComponent implements OnInit{
  listings$: Observable<Listing[]> = of([]);
  filteredListings$ : Observable<Listing[]> = of([]);
  searchTerm = '';

  constructor(private listingService : ListingService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.deleteListing(id);
    }
    this.getListings();
  }

  getListings(){
    this.listings$ = this.listingService.getListings();
    this.filteredListings$ = this.listings$.pipe(map((listings)=> listings.sort((a:Listing, b:Listing)=> a.title.localeCompare(b.title))));

    this.filteredListings$.pipe(toArray());
    this.filteredListings$.subscribe((listing)=>{
      if(listing){
        localStorage.setItem('listings', JSON.stringify(listing));
      }
    })
  }

  searchListing(event: any){
    const searchText = event.target.value;
    if(searchText){
      this.filteredListings$.subscribe((listings)=>{
        listings.filter((listing)=> listing.title.toLowerCase().includes(searchText.toLowerCase()));
      })
    }
  }



  deleteListing(id: string){
    this.listingService.deleteListing(id);
  }
}

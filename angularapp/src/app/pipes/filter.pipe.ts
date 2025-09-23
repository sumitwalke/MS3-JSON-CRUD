import { Pipe, PipeTransform } from '@angular/core';
import { Listing } from '../models/listing';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(listings: Listing[], searchTerm: String): Listing[] {
    if(!listings) return [];
    if(!searchTerm) return listings;

    return listings.filter((listing)=> listing.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}

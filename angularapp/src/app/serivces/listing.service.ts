import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  apiUrl = "https://ec2-65-0-27-30.projects.wecreateproblems.com/proxy/3000/listings";

  constructor(private http: HttpClient) { }

  addListing(listing: Listing):Observable<Listing>{
    return this.http.post<Listing>(this.apiUrl, listing);
  }

  getListings():Observable<Listing[]>{
    return this.http.get<Listing[]>(this.apiUrl);
  }

  getListing(id: String):Observable<Listing>{
    return this.http.get<Listing>(this.apiUrl + '/' + id);
  }

  updateListing(id: String, listing: Listing):Observable<Listing>{
    return this.http.put<Listing>(this.apiUrl + '/' + id, listing);
  }

deleteListing(id: String):Observable<Listing>{
    return this.http.delete<Listing>(this.apiUrl + "/" +id);
  }
}

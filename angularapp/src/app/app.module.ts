import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { GetListingsComponent } from './components/get-listings/get-listings.component';
import { GetListingComponent } from './components/get-listing/get-listing.component';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddListingComponent,
    GetListingsComponent,
    GetListingComponent,
    UpdateListingComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

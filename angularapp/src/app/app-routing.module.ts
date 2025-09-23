import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { GetListingsComponent } from './components/get-listings/get-listings.component';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';
import { GetListingComponent } from './components/get-listing/get-listing.component';

const routes: Routes = [
  {path: '', redirectTo: '/addListing', pathMatch: 'full'},
  {path: 'addListing', component:AddListingComponent},
  {path: 'getListings', component:GetListingsComponent},
  {path: 'getListings/:id', component:GetListingsComponent},
  {path: 'getListing/:id', component:GetListingComponent},
  {path: 'updateListing/:id', component:UpdateListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

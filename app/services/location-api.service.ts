import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LocationService{
  httpClient = inject(HttpClient);

  fetchData(){
    return this.httpClient.get('https://provinces.open-api.vn/api/?depth=3'); 
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarRentalResponseModel } from '../models/carRentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarRentalDetailService {

  apiUrl= environment.apiUrl + 'rentals/getrentaldetails';

  constructor(private httpClient: HttpClient) { }

  getCarRentalDetails(): Observable<CarRentalResponseModel>{
    return this.httpClient.get<CarRentalResponseModel>(this.apiUrl);
  }
}

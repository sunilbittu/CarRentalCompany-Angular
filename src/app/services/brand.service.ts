import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listReponseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>>{
    let newPath= this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    }

  

}

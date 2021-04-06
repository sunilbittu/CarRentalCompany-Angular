import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listReponseModel';
import { CarFilterPipe } from 'src/app/pipes/car-filter.pipe';
import { CarService } from 'src/app/services/car.service';
import { CarDetailService } from 'src/app/services/cardetail.service';
import { CarimageService } from 'src/app/services/carimage.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  carImagePaths: CarImage[] = [];
  carDetail:CarDetail;
  imageUrl = "https://localhost:44388/";
  state:boolean=false;
  isFirstRender:boolean=true;


  constructor(private carImageService: CarimageService, private activatedRoute: ActivatedRoute, private carService:CarService, private authService:AuthService,
              private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['carId']){
        this.getImagesByCar(params['carId'])
        this.getCarDetailsByCarId(params['carId'])
      }
    })
    this.isAdmin()
  }


  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    })
  }

  getImagesByCar(carId: number) {
    this.carImageService.getCarImagesByCar(carId).subscribe((response) => {
      this.carImagePaths = response.data
    });
  }


  isAdmin(){
    return this.authService.isAdmin()
  }


  deleteCar(){
    this.carService.deleteCar(this.carDetail).subscribe(response=>{
      this.toastrService.success('Car Deleted.')
    }, responseError=>{
      this.toastrService.error('Car Not Deleted.')
    })
  }


  changeState(){
      this.state = !this.state;
  }

  showModal(){
    if(this.isFirstRender){
      this.isFirstRender=false;
      return true;
    }
    return false;
  }


}

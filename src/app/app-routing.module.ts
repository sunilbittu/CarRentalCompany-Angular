import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { PaymentComponent } from './components/payment/payment.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BrandEditComponent} from './components/brand/brandEdit/brand-edit/brand-edit.component';

const routes: Routes = [
  {path:'' , pathMatch:'full', component:CarsComponent},
  {path:'cars', component:CarsComponent},
  // {path:'cars/brand/:brandId', component:CarsComponent},
  // {path:'cars/color/:colorId', component:CarsComponent},
  {path:'cars/detail/:carId', component:CardetailComponent},
  {path:'detail/:carId', component:CardetailComponent},
  {path:'brandEdit', component:BrandEditComponent},
  {path: 'login' , component:LoginComponent},
  {path: 'register' , component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

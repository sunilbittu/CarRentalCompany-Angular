import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userInfo : User = this.authService.getUser();

  constructor(private authService:AuthService, private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
  }


  isAuthenticated(){
    return this.authService.loggedIn()
  }


  logout(){
    this.localStorageService.removeToken()
  }


  ngDoCheck(){ // eğer userInfo içeriği user içeriğine eşit değilse onu eşitle
    if(this.userInfo !== this.authService.user){
      this.userInfo =this.authService.user
    }

  }



}

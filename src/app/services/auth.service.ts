import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LoginModel} from '../models/loginModel';
import {Observable} from 'rxjs';
import {TokenModel} from '../models/tokenModel';
import {HttpClient} from '@angular/common/http';
import {SingleResponseModel} from '../models/singleResponseModel';
import {RegisterModel} from '../models/registerModel';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + 'auth/';
  user: User;
  decodedTokenKey: any;
  token :string | null= ""

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private  localStorageService: LocalStorageService) {
  }


  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }


  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel);
  }


  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }


  getUser() {
    let decodedToken = this.decodedToken(this.localStorageService.getToken());
    console.log(decodedToken)

    if (decodedToken) {
      if(this.loggedIn()){
        let tokenInfoName = Object.keys(decodedToken).filter(u => u.endsWith('/name'))[0];
        let userName = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(u => u.endsWith('/nameidentifier'))[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(u => u.endsWith('/role'))[0];
        let roles = decodedToken[claimInfo];


        let tokenInfoEmail = decodedToken.email;

        this.user = {
          userName: userName,
          userId: userId,
          email: tokenInfoEmail,
          roles: roles
        };
      }
    }
    return this.user;
  }


  loggedIn() {
    if (this.localStorageService.getToken()) {
      return this.jwtHelper.isTokenExpired();
    } else {
      return false;
    }
  }



  isAdmin() {
    let isAdmin = false
    if (this.loggedIn()) {
      this.user.roles?.map(role => {
        if (role.toLocaleLowerCase().indexOf("admin") !== -1) {
          isAdmin = true;
        }
      })
    }
    return isAdmin;
  }
}

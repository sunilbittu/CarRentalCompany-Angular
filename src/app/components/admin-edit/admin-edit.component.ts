import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {


  userInfo = this.authService.getUser();
  userInfoEditForm: FormGroup;
  changePasswordForm:FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createUserInfoEditForm();
    this.createChangePasswordForm();
  }

  ngDoCheck(){
    if(!this.authService.loggedIn()){

    }
  }

  createUserInfoEditForm() {
    let userFullName: String[];
    userFullName = this.userInfo.userName.split(' ');

    this.userInfoEditForm = this.formBuilder.group({
      email: [this.userInfo.email],
      firstName: [userFullName.slice(0,userFullName.length-1).toString().replace(',', ' '), Validators.required],
      lastName: [userFullName[userFullName.length-1], Validators.required]
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: [this.userInfo.email],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }



}

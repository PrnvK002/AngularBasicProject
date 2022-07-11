import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public signupForm:FormGroup = new FormGroup({
    firstName : new FormControl('',[ Validators.required  ]),
    lastName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[ Validators.required, Validators.minLength(6) ]),
    confirmPassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
    dob : new FormControl('',[Validators.required]),
    phone : new FormControl('',[ Validators.required , Validators.minLength(10) , Validators.maxLength(10) ])
  });

  public otpModal:boolean = false;

  constructor(
    private router:Router,
    private authService:AuthLoginService
  ) { }

  ngOnInit(): void {
  }

  get firstName(){
    return this.signupForm.get('firstName');
  }

  get lastName(){
    return this.signupForm.get('lastName');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get phone(){
    return this.signupForm.get('phone');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  get dob(){
    return this.signupForm.get('dob');
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.otpModal = true;
    this.authService.sendOtp(this.signupForm.value)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

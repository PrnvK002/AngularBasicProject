import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth/auth-login.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginForm:FormGroup = new FormGroup({
    email : new FormControl('',[ Validators.required , Validators.email ]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  invalid:string='';
  message: string = "Successfully created the user"
  status:boolean = this.authService.status;

  constructor( 
    private authService : AuthLoginService,
    private router:Router
     ) { }

  ngOnInit(): void {
    
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    let data = this.loginForm.value;
    this.authService.login(data)
      .then((data) => {
        console.log(data);
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
        this.invalid = err.error.message;
      }) 
  }

}

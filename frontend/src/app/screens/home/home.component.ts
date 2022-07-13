import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthLoginService
  ) { }

  ngOnInit(): void {
    if(this.authService.loginStatus=== false){
      this.router.navigate(['login']);
    }
  }

}

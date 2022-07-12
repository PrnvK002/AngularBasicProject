import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userDetails } from 'src/app/models/auth.model';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( 
    public authService:AuthLoginService,
    private router:Router
     ) { }

  ngOnInit(): void {
    
  }

  public logout(){
    this.authService.logout(() =>{
      this.router.navigate(['login']);
    })
  }
}

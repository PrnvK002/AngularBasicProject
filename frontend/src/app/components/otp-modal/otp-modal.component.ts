import { Component, OnInit , Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css']
})
export class OtpModalComponent implements OnInit {

  @Input() handleClose:any;

  public otpForm:FormGroup = new FormGroup({
    otp : new FormControl('',[Validators.required])
  })

  constructor(
    private authService:AuthLoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }



  onSubmit(){
    console.log(this.otpForm.value);
    this.authService.signup(this.otpForm.value.otp)
      .then((data) => {
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

}

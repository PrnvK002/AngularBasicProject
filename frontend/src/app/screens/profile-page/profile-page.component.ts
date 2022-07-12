import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  updateProfile:FormGroup = new FormGroup({
    firstName : new FormControl(this.authService.userData.firstName,[ Validators.required  ]),
    lastName : new FormControl(this.authService.userData.lastName,[Validators.required]),
    email : new FormControl(this.authService.userData.email,[Validators.required,Validators.email]),
    dob : new FormControl(this.authService.userData.dob,[Validators.required]),
    phone : new FormControl(this.authService.userData.phone,[ Validators.required , Validators.minLength(10) , Validators.maxLength(10) ])
  });

  message:string = 'Successfully updated Profile';
  status:boolean = this.authService.status;

  constructor(
    public authService:AuthLoginService
  ) { }

  ngOnInit(): void {
  }

  get firstName(){
    return this.updateProfile.get('firstName');
  }

  get lastName(){
    return this.updateProfile.get('lastName');
  }

  get email(){
    return this.updateProfile.get('email');
  }

  get phone(){
    return this.updateProfile.get('phone');
  }


  get dob(){
    return this.updateProfile.get('dob');
  }

  onSubmit(){
    console.log(this.updateProfile.value);
    this.authService.updateUser(this.updateProfile.value,this.authService.userData._id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}

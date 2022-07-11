import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {
  loginModel,
  resolveModel,
  signupModel,
  userDetails,
} from 'src/app/models/auth.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});


@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  
  public userData = {} as userDetails;
  public signupData = {} as userDetails;

  basicUrl: string = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  login(loginData: loginModel) {
    return new Promise((resolve: resolveModel, reject: any) => {
      this.http
        .post<userDetails>(`${this.basicUrl}/login`, loginData , {headers})
        .subscribe({
          next: (data) => {
            this.userData = data;
            localStorage.setItem('userInfo',JSON.stringify(data));
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  signup(otp:string){
    let data = { ...this.signupData , otp };
    return new Promise((resolve:any , reject:any) => {
      this.http
        .post<any>(`${this.basicUrl}/register`,data, {headers})
        .subscribe({
          next : (data) => {
            resolve(data);
          },
          error : (error) => {
            reject(error)
          }
        })
    } )
  }

  sendOtp(signupData:signupModel){
    this.signupData = signupData;
    console.log(signupData);
    let data = {
      phone : this.signupData.phone
    }
    return new Promise((resolve:any,reject:any) => {
      this.http
        .post<any>(`${this.basicUrl}/sendOtp`,data,{headers})
        .subscribe({
          next : (data) => {
            resolve(data);
          },
          error : (error) => {
            console.log(error);
            reject(error);
          }
        })
    })
  }

}

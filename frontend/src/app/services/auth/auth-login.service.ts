import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
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
  public signupData = {} as signupModel;
  public status:boolean = false;

  basicUrl: string = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {
    this.getUserDetailsFromLocal();
  }

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
            this.status = true;
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

  public getProfileData(){
    const id:string = this.userData._id; 
    const authToken : string = this.userData.authToken;
    const customHeader = new HttpHeaders({
      authorization : `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    })
    return new Promise((resolve:any,reject:any) => {
      this.http
        .get<any>(`${this.basicUrl}/profile/${id}`,{ headers : customHeader })
        .subscribe({
          next : (data)=>{
            resolve(data);
          },
          error:(error)=>{
            reject(error);
          }
        })
    })
  }

  public updateUser(userData:userDetails,id:string){
    const authToken : string = this.userData.authToken;
    const customHeader = new HttpHeaders({
      authorization : `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });

    const data = {
      ...userData,
      id
    }
    return new Promise((resolve,reject) => {
      this.http
        .put<any>(`${this.basicUrl}/profile`,data,{headers:customHeader})
        .subscribe({
          next : (data) =>{
            localStorage.removeItem('userInfo');
            localStorage.setItem('userInfo',JSON.stringify(data._doc));
            this.userData = data._doc;
            this.status=true;
            resolve(data);
          },
          error : (err) => {
            reject(err);
          }
        })
    })
  }

  public logout( cb :()=>void ){
    this.userData = { } as userDetails;
    localStorage.removeItem('userInfo');
    cb();
  }

  private getUserDetailsFromLocal(){
    const userDetails = localStorage.getItem('userInfo');
    userDetails &&
      (this.userData = <userDetails>JSON.parse(userDetails));  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginPageComponent } from './screens/login-page/login-page.component';
import { ProfilePageComponent } from './screens/profile-page/profile-page.component';
import { SignupPageComponent } from './screens/signup-page/signup-page.component';
import { OtpModalComponent } from './components/otp-modal/otp-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginPageComponent,
    ProfilePageComponent,
    SignupPageComponent,
    OtpModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

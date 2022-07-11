import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './screens/login-page/login-page.component';
import {HomeComponent} from './screens/home/home.component'
import {ProfilePageComponent} from './screens/profile-page/profile-page.component'
import { SignupPageComponent } from './screens/signup-page/signup-page.component';

const routes: Routes = [
  { path:'',component:HomeComponent },
  { path:'login',component:LoginPageComponent },
  { path:'profile',component:ProfilePageComponent },
  { path:'signup' , component : SignupPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

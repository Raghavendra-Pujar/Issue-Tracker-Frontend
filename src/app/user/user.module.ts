import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path : 'sign-up', component : SignUpComponent, pathMatch : 'full'}
    ])
  ],
  declarations: [LoginComponent, SignUpComponent]
})
export class UserModule { }

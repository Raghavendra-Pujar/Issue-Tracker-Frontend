import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import Swal from 'sweetalert2';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userName;
  public email;
  public password;
  public confirmPassword;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(public apiService : ApiServiceService, public router : Router) {

     
   }

  ngOnInit() {
  }


  public signUp(){

    if(!this.email){
      this.Toast.fire({
        type : 'error',
        title : 'Enter your email-id'
      })
    }
    else if(!this.userName){
      this.Toast.fire({
        type : 'error',
        title : 'Enter your Full Name '
      })
    }else if(!this.password){
      this.Toast.fire({
        type : 'error',
        title : 'Enter your password'
      })
    }else if(!this.confirmPassword){
      this.Toast.fire({
        type : 'error',
        title : 'Fill the confirmPassowrd'
      })
    }

    else if(this.password !== this.confirmPassword){
      this.Toast.fire({
        type : 'error',
        title : 'Passwords didnot match'
      })
    }
    else{
    this.apiService.signUp(this.userName,this.email,this.password).subscribe((apiResponse)=>{
      if(apiResponse.status === 200){
        this.Toast.fire({
          type : 'success',
          position: 'top-end',
          showConfirmButton: true,
          title :'Registered Sucessfully'
        })

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }else {
        console.log(apiResponse)
        this.Toast.fire({
          type :'error',
          title : apiResponse.message
        })
    
      }

    
    }), (err) => {
      this.Toast.fire({
        type :'error',
        title : 'Unknown error'
      })
    };
  }
}

}

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import Swal from 'sweetalert2'
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email : String;
  public password : String;
  public user;
  constructor(public appService : ApiServiceService,
  public router : Router, public authService : AuthService) { }




  ngOnInit() {
    
  }


  signInWithGoogle(): void {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    console.log('reached google')
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user)=>{
      console.log(user);
      this.appService.signInGoogle(user.authToken).subscribe((apiResponse : any)=>{
        console.log(apiResponse)
        if (apiResponse.status === 200) {
              
           Cookie.set('authToken', apiResponse.data.authToken);
          
           Cookie.set('receiverId', apiResponse.data.userDetails.userId);
          
           Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           localStorage.setItem('authToken', apiResponse.data.authToken)
           localStorage.setItem('firstName', apiResponse.data.firstName)
           localStorage.setItem('userId', apiResponse.data.userId)
           this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
           Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
          
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        } else {
          console.log(apiResponse)
          Toast.fire({
            type :'error',
            title : apiResponse.message
          })
      
        }
  
      }, (err) => {
        Toast.fire({
          type :'error',
          title : err.message
        })
      });
  
    })
  }




  signOut(): void {
    this.authService.signOut();
  }

  public login = () =>{
    console.log(this.email)
    let data = {
      email: this.email,
      password: this.password
    }


    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });





    this.appService.login(this.email,this.password)
    .subscribe((apiResponse:any) => {

    
      console.log(apiResponse)
      if (apiResponse.status === 200) {
            
         Cookie.set('authToken', apiResponse.data.authToken);
        
         Cookie.set('receiverId', apiResponse.data.userDetails.userId);
        
         Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
         localStorage.setItem('authToken', apiResponse.data.authToken)
         localStorage.setItem('firstName', apiResponse.data.firstName)
         localStorage.setItem('userId', apiResponse.data.userId)
         this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
         Toast.fire({
          type: 'success',
          title: 'Signed in successfully'
        })
        
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      } else {
        console.log(apiResponse)
        Toast.fire({
          type :'error',
          title : apiResponse.message
        })
    
      }

    }, (err) => {
      Toast.fire({
        type :'error',
        title : err.message
      })
    });

  }
}

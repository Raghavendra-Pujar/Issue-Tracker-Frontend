import { Component } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public searchText;
  public router : Router;
  public login : LoginCheckService;
  public logout = () =>{
    console.log("entered logout")
    localStorage.clear();
    Cookie.deleteAll();
  }
}

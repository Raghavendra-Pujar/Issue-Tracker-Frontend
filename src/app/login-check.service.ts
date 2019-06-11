import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';


@Injectable()
export class LoginCheckService {
  public disconnectedSocket: boolean;
  constructor(public SocketService : SocketService, public router : Router) { }

  public checkStatus: any = () => {

    if (Cookie.get('authToken') === "undefined" || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {

      this.router.navigate(['/login']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus


  public logout: any = () =>{
    localStorage.clear();
    Cookie.deleteAll();
    this.router.navigate(['/login']);

  }

}


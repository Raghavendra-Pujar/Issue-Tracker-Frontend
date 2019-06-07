import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io  from 'socket.io-client';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;
  public authToken = Cookie.get('authToken');

  constructor(public http : HttpClient) { 
    this.socket = io(this.url);
  }

  public verifyUser = ()=>{
    console.log('verify user called')
     return Observable.create((observer)=>{
       this.socket.on('verifyUser',(data)=>{
         console.log('inside socket verifyUser')
         observer.next();
       })
     })
  }
  
  public setUser() {
   this.socket.emit('set-user', this.authToken)
   console.log("setting user")
 }

 public authError() {
   return new Observable((obs) => {
     this.socket.on('authError', () => {
       obs.next()
     })
   })
 }

 public commentNotification(){
   console.log('arrived in client')
  return new Observable((obs)=>{
    this.socket.on('comment-notification',(notification)=>{
      console.log('reached client');
      console.log(notification)
      obs.next(notification)
    })
  })
 }

 public editNotification(){
  console.log('arrived in client')
 return new Observable((obs)=>{
   this.socket.on('edit-notification',(notification)=>{
     console.log('reached client');
     console.log(notification)
     obs.next(notification)
   })
 })
}



}

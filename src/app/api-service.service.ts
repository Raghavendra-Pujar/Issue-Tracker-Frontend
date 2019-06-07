import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiServiceService {
  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data));

  }


  public baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http : HttpClient) { }


  public login(email,password): Observable<any>{
  console.log(email)

  const params = new HttpParams()
  .set('email',email)
  .set('password',password)
  console.log(params)
  return this.http.post(`${this.baseUrl}/users/login`, params);
  }


  public signUp(userName,email,password) : Observable<any>{
    const params = new HttpParams()
    .set('userName',userName)
    .set('email',email)
    .set('password',password)
    return this.http.post(`${this.baseUrl}/users/signup`, params);

  }

  public signInGoogle(authToken) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',authToken)
    return this.http.post(`${this.baseUrl}/users/googleLogin`,params);


  }

  

  public getIssueList(pageNo,size) : Observable<any>{
    //let authToken = this.getUserInfoFromLocalstorage().authToken;
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('pageNo',pageNo)
    .set('size',size);
    console.log(params);

    return this.http.post(`${this.baseUrl}/issue/getIssue-by-assignee`,params)
  }

  public issueDescription(issueId) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('issueId',issueId)
    console.log(params);

    return this.http.post(`${this.baseUrl}/issue/viewIssueById`,params);

  }

  public raiseIssue(title,assignee,description,status) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('title',title)
    .set('assigneeEmail',assignee)
    .set('description',description)
    .set('status',status)
    console.log(params)
    return this.http.post(`${this.baseUrl}/issue/raise`,params)

  }

  public editIssue(issueId,assigneeEmail,title,description,status) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('issueId',issueId)
    .set('assigneeEmail',assigneeEmail)
    .set('title',title)
    .set('description',description)
    .set('status',status)
    console.log(params)
    return this.http.put(`${this.baseUrl}/issue/${issueId}/editIssue`,params)

  }

  public search(searchText) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('text',searchText)

    console.log(params);
    return this.http.post(`${this.baseUrl}/issue/search`,params);
  }

  public viewComments(issueId) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('issueId',issueId)

    console.log(params);
    return this.http.post(`${this.baseUrl}/comment/viewCommentsById`,params)
  }

  public postComment(issueId,commentText) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('issueId',issueId)
    .set('comment',commentText)

    return this.http.post(`${this.baseUrl}/comment/create`,params)
  }

  public addWatcher(issueId) : Observable<any>{
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    .set('issueId',issueId)

    return this.http.post(`${this.baseUrl}/watcher/add`,params);
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.log(errorMessage);

    return Observable.throw(errorMessage);

  }


}

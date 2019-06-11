import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe'
import { LoginCheckService } from '../../login-check.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesComponent implements OnInit {
  public status;
  public title;
  public reporter;
  public date;
  public issueList : Array<any> = [];
  public message : String;
  public pageNo = 1;
  public itemLimit = 5;
  public moreItems : Boolean;
  public searchedValue : string;
  numberOfTicks = 0;

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(public apiService : ApiServiceService, public router : Router,public socket : SocketService,private ref: ChangeDetectorRef,public toastr: ToastrService,
    public loginService : LoginCheckService)
   { 
    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.ref.markForCheck();
    }, 1000);
   }

  ngOnInit() {
    this.getIssues();
    this.socket.verifyUser();
    this.socket.setUser();
    this.socket.authError();
    this.listenForComments();
    this.listenForEdit();
    console.log(this.loginService.checkStatus());

   
  }

  public getIssues = () =>{
  
    this.apiService.getIssueList(this.pageNo,this.itemLimit).subscribe((apiResponse : any) => {
      console.log(apiResponse);

      if (apiResponse.status === 200) {
        if(apiResponse.data.length > 0){
        this.issueList = this.issueList.concat(apiResponse.data);
        this.message = apiResponse.message;
        this.pageNo += 1;
        if(apiResponse.data.length == this.itemLimit){
          this.moreItems = true;
        }else this.moreItems = false;
      }else{
        this.moreItems = false;
        this.Toast.fire({
          type: 'info',
          title: 'No more Issues',
        })
        
      }
        
      }else {
        this.Toast.fire({
          type: 'error',
          title : 'Unable to fetch issues',
          text: apiResponse.message
        })
    
      }
    }),(err : any)=>{
      this.Toast.fire({
        type: 'error',
        title: 'Some error occured',
        text : 'Please try after sometime'
      })
    }
  }
  public toasterClickedHandler(issueId){
    console.log('click handler')
    this.router.navigate(['/issue',issueId])
  }
  

  public listenForComments(){
    this.socket.commentNotification().subscribe((notification : any)=>{
      console.log('notification received')
      this.toastr.info(notification.message,notification.title)
      .onTap
      .subscribe(() => this.toasterClickedHandler(notification.issueId));
  })

}

public listenForEdit(){
  this.socket.editNotification().subscribe((notification : any)=>{
    console.log('notification received')
    this.toastr.info(notification.message,notification.title)
    .onTap
    .subscribe(() => this.toasterClickedHandler(notification.issueId));
})

}

public listMoreIssues(){
this.getIssues()
}

key: string = 'status'; //set default
public reverse: Boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}

}
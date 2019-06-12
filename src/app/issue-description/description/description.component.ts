import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal from 'sweetalert2';
import * as $  from 'jquery';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { SocketService } from '../../socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LoginCheckService } from '../../login-check.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  public issueId;
  public issue;
  public editedIssue: any;
  public title;
  public status;
  public assignee;
  public description;
  public successfull;
  public tempIssue;
  public editIssue :Boolean;
  public comments;
  public message;
  public commentText;
  public toolTip;
  public loginStatus : Boolean;
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })

   
  constructor(public apiService: ApiServiceService, public route: ActivatedRoute , public router : Router,public socket : SocketService,
    public loginService : LoginCheckService) { 
   

  }

  ngOnInit() {
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.viewDescription()
    this.viewComments()
    $("#loader").hide()
    if(this.issueId)
    this.verifyEditer();
    this.loginStatus = this.loginService.checkStatus();
    console.log(this.loginStatus)

  }

  public viewDescription() {
    this.apiService.issueDescription(this.issueId).subscribe((apiResponse) => {
     console.log(apiResponse)
      if (apiResponse.status === 200) {
        this.issue = apiResponse.data;
      }
    })
  }
  
  public verifyEmail(){
    console.log("entered")
    console.log(this.assignee)
    //let email = this.assignee;
    $.ajax({
      type: 'POST',
      url : 'http://restapi.raghavendra-pujar.site/api/v1/users/verifyEmail',
      data: {email : this.assignee},
      dataType : "json",
      success :function(data){
        if(data.status === 200)
        $('.user-availability-status').html(data.message)
        console.log(data)
        this.successfull = false;
      },  error:function (){
        this.Toast.firin({
          type : 'error',
          title : 'Assignee not found'
        })
      }

    })
  }

  public verifyEditer(){
    console.log('Reached here')
    $.ajax({
      type : 'POST',
      url :'http://restapi.raghavendra-pujar.site/api/v1/issue/verifyEditer',
      data :{authToken : Cookie.get('authToken'),issueId : this.issueId},
      dataType : "json",
      success : function(data : any){
        if(data.status === 200){
          console.log(data)
          //console.log(this.canEdit)
        }else{
          console.log(data);
          $('#editbtn').prop("disabled",true);
          
        }
      },error : function(){
        this.Toast.firin({
          type : 'error',
          title : 'You are not authorized to edit this issue'
        })
      }
    })
  }


  public createIssue(){

    console.log("entered create")

    if(!this.title){
      this.Toast.fire({
        type : 'error',
        title : 'Give the title to the issue',
        timer : 3000
      })
    }else if(!this.assignee){
      this.Toast.fire({
        type : 'error',
        title : 'Give the Assignee Email to the issue',
        timer : 3000
      })
    }else if(!this.description){
      this.Toast.fire({
        type : 'error',
        title : 'Give the Description to the issue',
        timer : 3000
      })
    }else if(!this.status){
      this.Toast.fire({
        type : 'error',
        title : 'Give the status to the issue',
        timer : 3000
      })
    }
    else{

    this.apiService.raiseIssue(this.title,this.assignee,this.description,this.status).subscribe((apiResponse : any)=>{
    if(apiResponse.status === 200){
      console.log(apiResponse);
      this.tempIssue = apiResponse.data.issueId;
      this.Toast.fire({
        type : 'success',
        position : "top-end",
        title : "Raised successfully",
        timer : 3000
      })
      this.router.navigate(['/issue',this.tempIssue])
    }else{
      this.Toast.fire({
        type : 'error',
        title : apiResponse.message,
        timer : 3000
      })
    }
  })
}
  }

  public viewComments(){
    this.apiService.viewComments(this.issueId).subscribe((apiResponse)=>{
      if(apiResponse.status === 200){
        console.log(apiResponse);
        this.comments = apiResponse.data;
        console.log(this.comments)
      }else{
        this.message = apiResponse.message;
      }
    })
  }

  public postComment(){
    this.apiService.postComment(this.issueId, this.commentText).subscribe((apiResponse)=>{
      if(apiResponse.status === 200){
        console.log(apiResponse)
        this.Toast.fire({
          title : 'comment posted',
          type : 'success'
        })
        $("#commentTextarea").val("");
        this.router.navigate(['issue',this.issueId])
      }
    })
  }

  public addWatcher(){
    this.apiService.addWatcher(this.issueId).subscribe((apiResponse : any)=>{
      if(apiResponse.status === 200){
        console.log(apiResponse)
        this.Toast.fire({
          title : 'You will recieve notifications about this issue',
          type : 'success'
        })
      }else{
        this.Toast.fire({
          title : apiResponse.message,
          type : 'info'
        })
      }
    })
  }

 

}

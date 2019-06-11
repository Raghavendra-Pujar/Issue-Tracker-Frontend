import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { LoginCheckService } from '../../login-check.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  public issueId;
  public issue;

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })
  constructor(public apiService :ApiServiceService,public route: ActivatedRoute , public router : Router,
    public loginService : LoginCheckService) { }

  ngOnInit() {
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.viewDescription();
    this.loginService.checkStatus();

    

}


public viewDescription() {
  this.apiService.issueDescription(this.issueId).subscribe((apiResponse) => {
    console.log(apiResponse.data)
    if (apiResponse.status === 200) {
      this.issue = apiResponse.data;
    }
  })
}


public verifyEmail(){
  console.log("entered")
  //let email = this.assignee;
  $.ajax({
    type: 'POST',
    url : 'http://localhost:3000/api/v1/users/verifyEmail',
    data: {email : this.issue.assignee.email},
    dataType : "json",
    success :function(data){
      if(data.status === 200)
      $('.user-availability-status').html(data.message)
      console.log(data)
      this.successfull = false;
    },  error:function (){
      alert('error')
    }

  })
}


public editIssueDetails(){
  console.log("edit issue");
  this.apiService.editIssue(this.issueId,this.issue.assignee.email,this.issue.title,this.issue.description,this.issue.status).subscribe((apiResponse)=>{
    console.log(apiResponse)
    if(apiResponse.status === 200){
      this.Toast.fire({
        type : 'success',
        position : 'top-end',
        title : 'Issue has been updated',
        timer: 3000
      })
      this.router.navigate(['issue',this.issue.issueId])
    }else{
      this.Toast.fire({
        type : 'info',
        title : apiResponse.message
      })
    }

    //$('#issueConetent').show();
    
  })

}


}
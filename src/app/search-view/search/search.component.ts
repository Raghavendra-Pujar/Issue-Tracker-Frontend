import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchText;
  public issueLists = [];
  constructor(public apiService : ApiServiceService,public route : ActivatedRoute) { }

  ngOnInit() {
    this.searchText = this.route.snapshot.paramMap.get('searchText')
    console.log(this.searchText)
    this.searchTextFun();
  }

  public searchTextFun(){
    this.apiService.search(this.searchText).subscribe((apiResponse)=>{
      console.log(apiResponse)
      if(apiResponse.status === 200){
        this.issueLists = apiResponse.data
        console.log(this.issueLists)
      }
    })
  }

}

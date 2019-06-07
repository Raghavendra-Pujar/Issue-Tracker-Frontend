import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { IssuesComponent } from './issues/issues.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
      {path : 'dashboard', component : IssuesComponent, pathMatch : 'full'}
    ])
  ],
  declarations: [IssuesComponent]
})
export class DashBoardModule { }

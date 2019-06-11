import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { IssueEditComponent } from './issue-edit/issue-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild([
      { path :'issue', component : DescriptionComponent, pathMatch : 'full'},
      { path : 'issue/:issueId', component : DescriptionComponent, pathMatch : 'full'},
      { path : 'edit/:issueId', component : IssueEditComponent, pathMatch : 'full'}

    ])

  ],
  declarations: [DescriptionComponent, IssueEditComponent]
})
export class IssueDescriptionModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { ApiServiceService } from './api-service.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpResponse, HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DashBoardModule } from './dash-board/dash-board.module';
import { IssueDescriptionModule } from './issue-description/issue-description.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { SocketService } from './socket.service';
import { SearchComponent } from './search-view/search/search.component';
import { SearchViewModule } from './search-view/search-view.module';
import { DescriptionComponent } from './issue-description/description/description.component';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { NotFoundModule } from './not-found/not-found.module';
import { LoginCheckService } from './login-check.service';
import { FeaturesComponent } from './features/features/features.component';
import { FeaturesModule } from './features/features.module';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("951167059862-cdtqjun6mr3rpfdit16okgf3ve2mgnjq.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    DashBoardModule,
    SearchViewModule,
    IssueDescriptionModule,
    NotFoundModule,
    FeaturesModule,
    CKEditorModule,
    Ng2OrderModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot([
      { path : 'login', component : LoginComponent, pathMatch : 'full'},
      { path : '', redirectTo: 'login', pathMatch : 'full'},
      {path : 'dashboard', component : DescriptionComponent, pathMatch : 'full'},
      { path :'issue', component : DescriptionComponent, pathMatch : 'full'},
      { path : 'features',component : FeaturesComponent, pathMatch : 'full'},
      { path : 'search/:searchText', component : SearchComponent, pathMatch : 'full'},
      {path:'**',component:NotFoundComponent},
      { path : '*', component: LoginComponent}
    ])
  ],
  providers: [ApiServiceService,SocketService,LoginCheckService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

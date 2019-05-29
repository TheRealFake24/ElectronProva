import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SidebarModule } from 'ng-sidebar';

import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { HomeComponent } from './home/home.component';

import { JwtInterceptorService} from './jwt-interceptor.service';
import { ErrorInterceptorService} from './error-interceptor.service';
import { SpinnerComponent } from './spinner/spinner.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegistrazioneComponent },
  { path: 'home', component: HomeComponent},
  
  //{path: '404', component: Page404Component},
  //{path: '**', redirectTo:'/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrazioneComponent,
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash:true}),
    SidebarModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  exports: [ RouterModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

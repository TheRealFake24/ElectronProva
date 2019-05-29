import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

import { IpcRenderer} from 'electron'
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private ipc: IpcRenderer
  private url= "https://webapisecuredb.azurewebsites.net/"; //"http://localhost:57604/"; //56188

  constructor(private http:HttpClient,private route:Router) { }

  checkUser(email:string,password:string){ //effettuiamo la richiesta del token la prima volta che si accede
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
       });
  let options = { headers: headers };
    return this.http.post<any>(this.url+"token", "username="+email+"&password="+password+"&grant_type=password",options)
    .pipe(map(token=>{
                     localStorage.setItem('currentUser',JSON.stringify(token));
                     return token;
    }));
  }

  register(user:User){
    console.log(user);
    return this.http.post<any>(this.url+"api/Account/Register",user);
  }

  logout(){
    localStorage.removeItem("currentUser");
    //this.route.navigate([""]);
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send('logout');
  }

  getValues(){
    return this.http.get<any>(this.url+"api/values");
  }

  errorMessage(){
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send('errorLogin');
  }

  errorRegister(){
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send('errorRegister');
  }

  goToHome(){
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send('apriPaginaHome');
  }
  notifica(){
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send('notifica');
  }
}
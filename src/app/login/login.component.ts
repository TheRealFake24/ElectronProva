import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Notification } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  email:string;
  password:string;
  loading:boolean
  notification:Notification;
  nome:string;

  constructor(private route:Router,private service:UserService) { }

  ngOnInit() {
    this.nome="";
  }

  apriRegistrazione(){
    this.route.navigate(["register"])
  }

  login(){
    //this.service.goToHome();
    this.loading=true;
    this.service.checkUser(this.email,this.password).subscribe(res=>{
      if(res!=null){
        console.log("Loggato");
        //this.route.navigate(["home"]);
        this.service.goToHome();
      }
      else{
        console.log("Errore");
      }
      this.loading=false;
    },
    error=>{
      this.service.errorMessage();
      this.loading=false;
    })
  }

  apriPagina(){
    this.service.goToHome();
  }

  notify(){
    this.service.notifica();
  }
}

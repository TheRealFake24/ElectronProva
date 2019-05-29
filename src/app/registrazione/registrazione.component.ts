import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  loading:boolean
  user:User
  constructor(private service:UserService,private route:Router) { }

  ngOnInit() {
    this.user=new User();
  }

  registra(){
    this.loading=true;
    this.service.register(this.user).subscribe(()=>{
      this.loading=false;
      this.route.navigate([""])
    },
    error=>{
      this.service.errorRegister();
      //console.log(error);
      this.loading=false;
    });
  }
  
  login(){
    this.route.navigate([""]);
  }
}

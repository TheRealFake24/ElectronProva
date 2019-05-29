import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { UserService } from '../user.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  valori:string[]
  valore:string
  constructor(private service:HomeService,private userService:UserService,public sidebar:SidebarService) { }

 _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;
  }

  ngOnInit() {
    this.service.getValori().subscribe(res=>this.valori=res);
  }

  getValori(){
    this.service.getValori().subscribe(res=>this.valori=res);
  }

  getValore(){
    this.service.getValore().subscribe(res=>this.valore=res);
  }

  logout(){
    this.userService.logout();
  }

  apriPagina(){
    
  }
}

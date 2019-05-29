import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  _opened:boolean=false;

  constructor() { }

  toggleSidebar(){
    this._opened=!this._opened;
  }
}

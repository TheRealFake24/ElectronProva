import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IpcRenderer} from 'electron'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-electron';
  private ipc: IpcRenderer

  constructor(private http:HttpClient){
  }

  prova(){
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
        this.ipc.send('apriPagina');
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

}

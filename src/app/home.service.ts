import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url="https://webapisecuredb.azurewebsites.net/";//"http://localhost:57604/api/";
  constructor(private http:HttpClient) { }

  getValori(){
    return this.http.get<string[]>(this.url+"api/values");
  }

  getValore(){
    return this.http.get<string>(this.url+"api/values/5");
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpSentEvent,HttpHeaderResponse,HttpProgressEvent,HttpResponse,HttpUserEvent } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject, } from 'rxjs';
import { catchError,switchMap,finalize,filter,take } from 'rxjs/operators';
import { UserService } from './user.service';
import { IpcRenderer} from 'electron'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  private ipc: IpcRenderer
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any>{
     
      return next.handle(request).pipe(catchError(err => { //se otteniamo un errroe 401 vuol dire che il token o il refresh_token sono scaduti
         
          if (err.status === 401) {  
            this.ipc = (<any>window).require('electron').ipcRenderer
            this.ipc.send('err401');
          }
          const error = err.error.message || err.statusText;
          
          return throwError(error);
      }));
  }

}

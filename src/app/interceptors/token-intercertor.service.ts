import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercertorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('token')){

      const token = localStorage.getItem('token');
      const TokenAuth = new HttpHeaders({
        'Authorization' : 'Token ' + token,

      });

      const reqClone = req.clone({
        headers:TokenAuth
      })

      return next.handle(reqClone);
    }
    else{
      return next.handle(req);
    }
  }
}

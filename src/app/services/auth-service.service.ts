import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs';
import {catchError, ignoreElements, map, tap} from 'rxjs/operators';
//import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

import { ILoginCredentials } from './interfaz-loginCredentials';
import { SuccesfulLoginDto } from './interfaz-SuccesfulLoginDto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environmentProd.serverUrl
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  loginBool:boolean=false
  private _authToken: string
  public get authToken():string{
    return this._authToken
  }


  constructor(private router:Router, private httpclient: HttpClient) { this._authToken=''}

  login(credentials:ILoginCredentials):Observable<never>
  {

    return this.httpclient.post<SuccesfulLoginDto>(`${this.baseUrl}/login/`,credentials).pipe(
      tap(({token}) => this.handleSuccesfulLogin(token)),
      ignoreElements(),
      catchError((error)=>{
        if(error.status === 401)
        {
          return throwError('Error de credenciales invalidas');
        }
        else if(error.status === 400)
        {
          return throwError('Error de mal pedido')
        }
        alert('Se ha producido un error. Intentelo de nuevo');
        return EMPTY;
      })
    );
  }

  register(credentials:ILoginCredentials):Observable<never>
  {
    return this.httpclient.post<SuccesfulLoginDto>(`${this.baseUrl}/register/`,credentials).pipe(
      tap(({token}) => this.handleSuccesfulLogin(token)),
      ignoreElements(),
      catchError((error)=>{
        if(error.status === 401)
        {
          return throwError('Error de credenciales invalidas');
        }

        alert('Se ha producido un error. Intentelo de nuevo')
        return EMPTY
      })
    );
  }

  private handleSuccesfulLogin(token:string):void{
    this.loggedIn.next(true);
    this.loginBool = true
    this._authToken = token
    localStorage.setItem('token',this._authToken)
    this.redirectHome();
  }

  logOut():void{
    this.loggedIn.next(false);
    this.loginBool = false
    this._authToken = '';
    this.redirectLogin()
  }

  private redirectLogin():void{
    this.router.navigate(['login'])
  }

  private redirectHome():void{
    this.router.navigate(['admin/dashboard'])
  }
}

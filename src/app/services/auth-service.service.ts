import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs';
import {catchError, ignoreElements, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { ILoginCredentials } from './interfaz-loginCredentials';
import { SuccesfulLoginDto } from './interfaz-SuccesfulLoginDto';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.serverUrl
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  private _authToken: string | null=null
  public get authToken():string|null{
    return this._authToken
  }


  constructor(private router:Router, private httpclient: HttpClient) { }

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
    this._authToken = token
    localStorage.setItem('token',this._authToken)
    this.redirectHome();
  }

  logOut():void{
    this.loggedIn.next(false);
    this._authToken = null;
    this.redirectHome()
  }

  private redirectHome():void{
    this.router.navigate(['admin'])
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs';
import {catchError, ignoreElements, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { ILoginCredentials } from './interfaz-loginCredentials';
import { SuccesfulLoginDto } from './interfaz-SuccesfulLoginDto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment
  // private loggedIn = new BehaviorSubject<boolean>(false);
  // loggedIn$ = this.loggedIn.asObservable();
  // loginBool:boolean

  public get authToken():string{
    return this._authToken
  }

  private _authToken: string


  constructor(private router:Router, private httpclient: HttpClient) {
    if(this.isAuth)
    {
      this._authToken = localStorage.getItem('token')
    }
  }

  login(username, password){
    return this.httpclient.post<any[]>(`${this.baseUrl}/login/`, {
      'username': username,
      'password': password
    })
  }

  // register(credentials:ILoginCredentials):Observable<never>
  // {
  //   return this.httpclient.post<SuccesfulLoginDto>(`${this.baseUrl}/register/`,credentials).pipe(
  //     tap(({token}) => this.handleSuccesfulLogin(token)),
  //     ignoreElements(),
  //     catchError((error)=>{
  //       if(error.status === 401)
  //       {
  //         return throwError('Error de credenciales invalidas');
  //       }

  //       alert('Se ha producido un error. Intentelo de nuevo')
  //       return EMPTY
  //     })
  //   );
  // }

  handleSuccesfulLogin(token:string):void{
    // this.loggedIn.next(true);
    // this.loginBool = true
    this._authToken = token
    localStorage.setItem('token',this._authToken)
    this.redirectHome();
  }

  isAuth():boolean{
    if(localStorage.getItem('token')){
      return true
    }
    return false
  }

  logOut():void{
    // this.loggedIn.next(false);
    // this.loginBool = false
    this._authToken = '';
    localStorage.clear()
    this.redirectLogin()
  }

  private redirectLogin():void{
    this.router.navigate(['login'])
  }

  redirectHome():void{
    this.router.navigate(['admin/dashboard'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  setUser(user){
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
}

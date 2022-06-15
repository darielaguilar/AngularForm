import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import {HttpClientModule,HttpClient,HttpResponse} from '@angular/common/http'

import { Observable } from 'rxjs';
import {catchError, ignoreElements, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { ILoginCredentials } from './interfaz-loginCredentials';
import { SuccesfulLoginDto } from './interfaz-SuccesfulLoginDto';
@Injectable({
  providedIn: 'root'
})
//Este servicio sera para las solicitudes generales al backend otros servicios lo usaran como dependencia
export class ApiService {
  private baseUrl = environment.serverUrl


  constructor(private http:HttpClient) {

   }

   getObject(path:string):any{
      this.http.get<Array<any>>(`${this.baseUrl}/`+path).subscribe();
   }

   postObject(path:string, objPost:Object):void{
      this.http.post<Array<any>>(`${this.baseUrl}/`+path,objPost)
   }

   deleteObject(path:string,objDel:Object):void{
    this.http.delete<Array<any>>(`${this.baseUrl}/`+path,objDel)
   }
}

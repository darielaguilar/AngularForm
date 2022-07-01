import { Injectable } from '@angular/core';


import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http'

import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
//Este servicio sera para las solicitudes generales al backend otros servicios lo usaran como dependencia
export class ApiService {
  //private baseUrl = environment.serverUrl
  private baseUrl = environment.serverUrl

  constructor(private http:HttpClient) {

   }

   getObject(path:string,token: {headers?: HttpHeaders | {[header: string]: string | string[]}} ) :any{


      return this.http.get(`${this.baseUrl}/`+path,token);
   }

   postObject(path:string, token: {headers?: HttpHeaders | {[header: string]: string | string[]}},objPost:Object):any{
      return this.http.post<any>(`${this.baseUrl}/`+path,objPost,token).subscribe((response: HttpResponse<any>)=>{console.log(response.status);console.log(response.headers)})
   }

   deleteObject(path:string,token: {headers?: HttpHeaders | {[header: string]: string | string[]}}):any{
    return this.http.delete(`${this.baseUrl}/`+path, token).subscribe((response: HttpResponse<any>)=>{console.log(response.status);console.log(response.headers)},
    (error)=>console.log(error))
   }

   updateObject(path:string,objUpd:Object, token: {headers?: HttpHeaders | {[header: string]: string | string[]}}):any{
    return this.http.put(`${this.baseUrl}/`+path,objUpd, token).subscribe((response: HttpResponse<any>)=>{console.log(response.status);console.log(response.headers)})
   }
}

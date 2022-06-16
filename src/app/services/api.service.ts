import { Injectable } from '@angular/core';


import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http'

import { AuthServiceService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
//Este servicio sera para las solicitudes generales al backend otros servicios lo usaran como dependencia
export class ApiService {
  private baseUrl = environment.serverUrl


  constructor(private http:HttpClient) {

   }

   getObject(path:string,token: {headers?: HttpHeaders | {[header: string]: string | string[]}} ) :any{


      return this.http.get(`${this.baseUrl}/`+path,token);
   }

   postObject(path:string, objPost:Object):void{
      this.http.post(`${this.baseUrl}/`+path,objPost)
   }

   deleteObject(path:string,objDel:Object):void{
    this.http.delete(`${this.baseUrl}/`+path,objDel)
   }
}

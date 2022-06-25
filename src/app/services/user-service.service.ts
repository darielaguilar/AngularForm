import { Injectable, NgModule } from '@angular/core';
import {HttpClientModule,HttpClient, HttpHeaders} from '@angular/common/http'
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
//import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ILoginCredentials } from './interfaz-loginCredentials';
import { AuthService } from './auth-service.service';
import { IUser } from '../interfaces/IUser';
@NgModule({
  imports:[
    HttpClientModule,
  ],

})

@Injectable({
  providedIn: 'root'
})


export class UserServiceService {
  //private ApiUrl = environment.serverUrl;
  private ApiUrl = environmentProd.serverUrl

  constructor(private api:ApiService,private auth:AuthService) {

   }

  getUser(id:number):any{
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    return this.api.getObject('user-viewset/'+id, {headers:headers})
  }

  getUserList():Observable<IUser[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    return this.api.getObject('user-viewset/', {headers:headers})
  }

  postUser(user:any):any{
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken,
      'Content-Type': 'application/json'
    })
    console.log('post hecho con'+JSON.stringify(user))

     this.api.postObject('user-viewset/',{headers:headers},JSON.stringify(user))

  }

  deleteUser(id:number){
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    console.log(this.api.deleteObject('user-viewset/'+id, {headers:headers}))
    console.log('delete hecho con id: '+id)
    this.api.deleteObject('user-viewset/'+id, {headers:headers})
  }
  updateUser(id:number, user:IUser){
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    this.api.updateObject('user-viewset/'+id+'/', user,{headers:headers})
    console.log('update hecho con id: '+id+' user: '+JSON.stringify(user))
  }
}

import { Injectable, NgModule } from '@angular/core';
import {HttpClientModule,HttpClient, HttpHeaders} from '@angular/common/http'
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ILoginCredentials } from './interfaz-loginCredentials';
import { AuthServiceService } from './auth-service.service';
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
  private ApiUrl = environment.serverUrl;


  constructor(private api:ApiService,private auth:AuthServiceService) {

   }

  getUser(id:number):any{
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    return this.api.getObject('user-viewset/'+id, {headers:headers})
  }

  getUserList():any{
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    return this.api.getObject('user-viewset/', {headers:headers})
  }
}

import { Injectable, NgModule } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http'
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ILoginCredentials } from './interfaz-loginCredentials';
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


  constructor(private api:ApiService) {

   }

  getUser():void{

  }

  getUserList():any{
    return this.api.getObject('user-viewset')
  }
}

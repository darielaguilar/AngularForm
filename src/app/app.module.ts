import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { UserServiceService } from './services/user-service.service';
import { Routes,Router,RouterLink,RouterModule,RouterOutlet } from '@angular/router';

import { PageNotFoundComponent } from './modules/admin/components/page-not-found/page-not-found.component';
import { AuthServiceService } from './services/auth-service.service';
import { AdminModule } from './modules/admin/admin.module';
import { AdminComponent } from './modules/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
const routes:Routes=[

  //Authentication routes
  {path:'admin', loadChildren: ()=> import("../app/modules/admin/admin.module").then((m)=>
  m.AdminModule)},

  {path:'**', component:PageNotFoundComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent

  ],

  imports: [

    BrowserModule,
    AdminModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),


  ],
  providers: [{provide:AuthServiceService, useClass:AuthServiceService}, {provide:UserServiceService, useClass:UserServiceService} ],
  bootstrap: [AppComponent]
})


export class AppModule {

 }

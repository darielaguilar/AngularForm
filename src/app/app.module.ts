import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { UserServiceService } from './services/user-service.service';
import { Routes,Router,RouterLink,RouterModule,RouterOutlet } from '@angular/router';

import { PageNotFoundComponent } from './modules/admin/components/page-not-found/page-not-found.component';
import { AuthService } from './services/auth-service.service';
import { AdminModule } from './modules/admin/admin.module';
import { AdminComponent } from './modules/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenIntercertorService } from './interceptors/token-intercertor.service';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
const routes:Routes=[

  //Authentication routes
  {path:'', component:AdminComponent,canActivate:[AdminGuard]},
  {path:'', loadChildren: ()=> import("../app/modules/admin/admin.module").then((m)=>
  m.AdminModule)},

  {path:'**', component:PageNotFoundComponent}

]
@NgModule({
  declarations: [
    AppComponent,


  ],

  imports: [

    BrowserModule,
    AdminModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),


  ],
  providers: [
    {provide:AuthService, useClass:AuthService},
    {provide:UserServiceService, useClass:UserServiceService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercertorService,
      multi: true
    },
   ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }

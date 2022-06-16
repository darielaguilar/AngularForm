import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/LoginForm/login-form/login-form.component';
import { NavBarComponent } from './components/navBar/nav-bar/nav-bar.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserItemListComponent } from './components/user-item-list/user-item-list.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';


import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';

import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';

import { HttpClientModule } from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import {admin} from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {MenubarModule} from 'primeng/menubar';
@NgModule({
  imports: [
  CommonModule,
  CardModule,
  InputTextModule,
  PasswordModule,
  DividerModule,
  ButtonModule,
  FormsModule,
  SidebarModule,
  MenuModule,
  HttpClientModule,
  PanelMenuModule,
  MenubarModule,

  ReactiveFormsModule,
  RouterModule.forChild(admin),
],exports:([
  LoginFormComponent,
  NavBarComponent,
  UserItemComponent,
  UserItemListComponent,
  RegisterFormComponent,
  PageNotFoundComponent,
  CommonModule,
  CardModule,
  InputTextModule,
  PasswordModule,
  DividerModule,
  ButtonModule,
  FormsModule,
  SidebarModule,
  MenuModule,
  HttpClientModule,
  PanelMenuModule,
  DashboardComponent,
  ReactiveFormsModule,
  MenubarModule,

]),
  declarations: [

    LoginFormComponent,
    NavBarComponent,
    UserItemComponent,
    UserItemListComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    DashboardComponent,

  ]

})
export class AdminModule { }

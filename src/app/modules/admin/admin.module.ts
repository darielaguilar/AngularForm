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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table'
import { HttpClientModule } from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {CheckboxModule} from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import {admin} from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { AdminComponent } from './admin.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

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
  ConfirmDialogModule,
  DialogModule,
  TableModule,
  ToastModule,
  RippleModule,
  ToolbarModule,
  CheckboxModule,
  ReactiveFormsModule,
  AvatarModule,
  AvatarGroupModule,
  RouterModule.forChild(admin),
],exports:([
  CommonModule,
  CheckboxModule,
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
  ConfirmDialogModule,
  DialogModule,
  TableModule,
  ToastModule,
  ToolbarModule,
  ReactiveFormsModule,
  RippleModule,
  AvatarModule,
  AvatarGroupModule,
]),
  declarations: [
    AdminComponent,
    LoginFormComponent,
    NavBarComponent,
    UserItemComponent,
    UserItemListComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    DashboardComponent,

  ],
  providers:[
    ConfirmationService,
    MessageService
  ]

})
export class AdminModule { }

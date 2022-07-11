import { UserItemListComponent } from './components/user-item-list/user-item-list.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginFormComponent } from './components/LoginForm/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { PaintingsListComponent } from './components/paintings-list/paintings-list.component';

export const admin:Routes = [

  {
    path:'admin', component:AdminComponent,
    children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'users', component:UserItemListComponent},
      {path:'paintings', component:PaintingsListComponent}
    ],
    canActivate:[AdminGuard]
  },
  {path:'login', component:LoginFormComponent},
  {path:'register', component:RegisterFormComponent}
]

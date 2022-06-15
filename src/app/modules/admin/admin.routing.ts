import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginFormComponent } from './components/LoginForm/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
export const admin:Routes = [

  {path:'',component:AdminComponent,children:[{path:'dashboard',component:DashboardComponent}],canActivate:[AdminGuard]},
  {path:'login',component:LoginFormComponent},
  {path:'register',component:RegisterFormComponent}
]

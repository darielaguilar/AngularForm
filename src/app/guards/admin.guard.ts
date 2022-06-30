import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth:AuthService ,private router: Router){}

  canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean | UrlTree {
    console.log(state.url)

    if(state.url == '/admin'){
      if(this.auth.isAuth()){
        this.router.navigate(['/admin/dashboard'])
        return true
      }
      else{
        this.router.navigate(['/admin/login'])
      }
    }

    //return this.auth.isAuth() || this.router.parseUrl('login') ;

    return true
  }

}

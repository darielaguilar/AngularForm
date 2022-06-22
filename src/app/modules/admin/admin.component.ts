import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  navBarMD:boolean = false;
  navBarSM:boolean = false;


  constructor(private primengConfig: PrimeNGConfig, public auth:AuthService) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }


  ToggleSideBar(){
    this.navBarMD = !this.navBarMD;
    this.navBarSM = !this.navBarSM;
  }

}

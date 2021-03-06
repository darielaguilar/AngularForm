import { MenuItem, PrimeNGConfig } from 'primeng/api';
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
  sideBarLock: boolean = false;

  user:any;
  itemsSideBar: MenuItem[];


  constructor(private primengConfig: PrimeNGConfig, public auth:AuthService) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.user = this.auth.getUser();
    //Cargando items de side bar
    this.loadSideBarItems()

  }


  ToggleSideBar(){
    this.navBarMD = !this.navBarMD;
    this.navBarSM = !this.navBarSM;
  }

  toggleLockSideBar(){
    this.sideBarLock = !this.sideBarLock
    localStorage.setItem('lockSideBar', String(this.sideBarLock))
  }

  iconLock():string{
    if(this.sideBarLock){
      return "pi pi-lock"
    }
    else{
      return "pi pi-lock-open"
    }
  }

  loadSideBarItems(){
    this.itemsSideBar = [
      {
          label: 'Dashboard',
          icon: 'pi pi-pw pi-microsoft',
          routerLink: '/admin/dashboard/',
          command:()=>{if(!this.sideBarLock) this.ToggleSideBar()}
      },
      {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          routerLink: '/admin/users/',
          command:()=>{if(!this.sideBarLock) this.ToggleSideBar()}
      },
      {
          label: 'Paintings',
          icon: 'pi pi-fw pi-pencil',
          routerLink: '/admin/paintings',
          command:()=>{if(!this.sideBarLock) this.ToggleSideBar()}
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
    ];

    // ver lock del side bar
    if(localStorage.getItem('lockSideBar')){
      if(localStorage.getItem('lockSideBar') == 'true'){
        this.sideBarLock = true
      }
      else{
        this.sideBarLock = false
      }
    }


    //obtengo user agent
    var ua = navigator.userAgent;

    // Compruebo el tipo de dispositivo en el que estoy
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
    {
       this.navBarMD = false
    }
    else
    {
      this.navBarMD = true
    }
  }

}

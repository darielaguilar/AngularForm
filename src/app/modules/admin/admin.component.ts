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

  loadSideBarItems(){
    this.itemsSideBar = [
      {
          label: 'Dashboard',
          icon: 'pi pi-pw pi-microsoft',
          routerLink: '/admin/dashboard/',
      },
      {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          routerLink: '/admin/users/'
      },
      {
          label: 'Paintings',
          icon: 'pi pi-fw pi-pencil',
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

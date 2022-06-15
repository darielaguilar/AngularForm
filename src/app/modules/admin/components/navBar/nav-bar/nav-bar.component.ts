import { Component, OnInit, Input,Output } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  display: boolean;
  items:MenuItem[];
  constructor() {
    this.display = false;
    this.items=[
      {
        label: 'Users',
        icon: 'pi pi-user',
        items:[{
            label:'New',
            icon: 'pi pi-plus-circle'
        },
        {
            label:'Delete',
            icon:'pi pi-minus'
        },
        {
          label:'List',
          icon:'pi pi-list'
        }
      ]
      }
    ]
   }

  ngOnInit(): void {

  }

}

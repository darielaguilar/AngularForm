
import { Component, Inject, NgModule, OnInit } from '@angular/core';

import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})


export class UserItemComponent implements OnInit {
  user:any[];
  constructor(private userServ: UserServiceService) {
    this.user = this.userServ.getUserList()
   }

  ngOnInit(): void {


  }



}

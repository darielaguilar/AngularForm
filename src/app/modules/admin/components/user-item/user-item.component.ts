
import { Component, Inject, NgModule, OnInit } from '@angular/core';

import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})


export class UserItemComponent implements OnInit {
  data:Object ;
  DataUser$: Observable<IUser>;

  constructor(private userServ: UserServiceService) {
    this.DataUser$ = this.userServ.getUser(1);
    this.data = {};
   }


  ngOnInit(): void {


  }



}

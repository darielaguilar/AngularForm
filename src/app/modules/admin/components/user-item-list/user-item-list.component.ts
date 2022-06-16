import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Observable, pipe } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.css']
})
export class UserItemListComponent implements OnInit {
  data:any;
  DataUser$: Observable<IUser>;
  constructor(private userServ: UserServiceService) {
    this.DataUser$ = this.userServ.getUserList();

   }

  ngOnInit(): void {
    this.DataUser$.subscribe(
      {next:(data)=>{this.data = data
      console.log(data)}},

   )
  }




}

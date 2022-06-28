import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Observable, pipe } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.css']
})
export class UserItemListComponent implements OnInit {

  userDialog:boolean
  submitted:boolean

  user:IUser
  selectedUsers: IUser[]
  users:IUser[]

  data:any;
  DataUser$: Observable<IUser[]>;

  constructor(private userServ: UserServiceService, private confirm:ConfirmationService,private messageService: MessageService) {
    this.DataUser$ = this.userServ.getUserList();

   }

  ngOnInit(): void {
    this.loadTable()
  }



  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}

loadTable():void
{
  this.DataUser$.subscribe(
    {next:(data)=>{this.data = data
    this.users = data
    console.log(data)
    }},
 )
}

editUser(user: IUser) {
  this.user = {...user};
  this.userDialog = true;
}
  deleteSelectedUsers() {
    this.confirm.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.data = this.data.filter(val => !this.selectedUsers.includes(val));
            this.selectedUsers = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

deleteUser(user: IUser) {
  this.confirm.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.userServ.deleteUser(user.id)
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          this.loadTable()
      }
  });
}

hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}
saveUser() {
  this.submitted = true;

  if (this.user.name.trim()) {
      if (this.user.id) {
          this.userServ.updateUser(this.user.id,this.user);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      }
      else {
          this.userServ.postUser(this.user).subscribe({
            next:(data)=> {
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
              this.loadTable()
            },
            error:(err)=> {}
          })

      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};


  }
}

}

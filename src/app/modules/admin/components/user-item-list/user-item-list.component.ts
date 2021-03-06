import { AuthService } from './../../../../services/auth-service.service';
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

  loader: boolean = true

  constructor(private authService: AuthService, private userServ: UserServiceService, private confirm:ConfirmationService,private messageService: MessageService) {
    //this.DataUser$ = this.userServ.getUserList();

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
  this.userServ.getUserList().subscribe(
    {
      next:(data)=>{
        this.data = data
        this.users = data
        this.loader = false
      },
      error:(error)=>{
        Object.entries(error.error).forEach(([key, value]) =>{
          if(key == 'detail'){
            this.messageService.add({severity:'error', summary:`Sesión`, detail:`Sesión expirada`});
            setTimeout(()=>{
              this.authService.logOut()
            }, 2000)
          }
          else{
            this.messageService.add({severity:'error', summary:`Error en el Campo ${key}`, detail:`${value}`});
          }
        })
      }
    },
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
            let tempArr = this.data.filter(val => !this.selectedUsers.includes(val));
            for(let i of this.selectedUsers){
              console.log(i.id)
              this.userServ.deleteUser(i.id).subscribe({
                next:(data)=>{
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
                  this.loadTable()
                },
                error:(err) => {
                  console.log(err)
                }
              })
            }
            this.selectedUsers = [];

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
          this.userServ.updateUser(this.user.id,this.user).subscribe({
            next:()=>{
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            },
            error:(err)=>{console.log(err)}
          }

          );
          this.loadTable();
      }
      else {
          this.userServ.postUser(this.user).subscribe({
            next:(data)=> {
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
              this.loadTable()
            },
            error:(err)=> {console.log(err)}
          })

      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
  }
}

}

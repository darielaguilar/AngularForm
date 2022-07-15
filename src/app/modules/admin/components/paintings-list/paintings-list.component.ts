import { Component, OnInit } from '@angular/core';
import { IPainting } from 'src/app/interfaces/IPainting';
import {ApiService} from 'src/app/services/api.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-paintings-list',
  templateUrl: './paintings-list.component.html',
  styleUrls: ['./paintings-list.component.css']
})
export class PaintingsListComponent implements OnInit {

  paint:IPainting
  paintings:IPainting[]
  name:string
  image:File

  paintDialog:boolean
  submitted:boolean

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private PaintingServ:ApiService,private auth:AuthService, private messageService:MessageService, private confirm:ConfirmationService) { }

  ngOnInit(): void {
    this.loadDataView()

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
  }

  openNew() {
    this.paint = {};
    this.submitted = false;
    this.paintDialog = true;
}
  hideDialog() {
    this.paintDialog = false;
    this.submitted = false;
  }

  //Esta funcion es como el loadTable en user-item-list.ts
  loadDataView(){
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    this.PaintingServ.getObject('cuadro-viewset/',{headers:headers}).subscribe({
      next:(paint)=>{
        this.paintings = paint
        console.log("Este es el response"+this.paintings)
      },
      error:(error)=>{
        Object.entries(error.error).forEach(([key, value]) =>{
          if(key == 'detail'){
            this.messageService.add({severity:'error', summary:`Sesión`, detail:`Sesión expirada`});
            setTimeout(()=>{
              this.auth.logOut()
            }, 2000)
          }
          else{
            this.messageService.add({severity:'error', summary:`Error en el Campo ${key}`, detail:`${value}`});
          }
        })
      }
    })
  }


  //Esta es la funcion que se ejecuta cuando se toca el boton save en el dialog modal que sale cuando tocas new
  savePaint(){
    this.submitted = true;

    const UploadData = new FormData()
    UploadData.append('name',this.paint.name)
    UploadData.append('img', this.image, this.image.name)

    if (this.paint.name.trim()) {
        if (this.paint.id) {
            this.PaintingServ.updateObject('cuadro-viewset/',this.paint).subscribe({
              next:()=>{
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
              },
              error:(err)=>{console.log(err)}
            }

            );
            this.loadDataView();
        }
        else {
            this.PaintingServ.postObject('cuadro-viewset/',UploadData).subscribe({
              next:(data)=> {
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});

              },
              error:(err)=> {console.log(err)}
            })

        }
        this.loadDataView()
        this.paintings = [...this.paintings];
        this.paintDialog = false;
        this.paint = {};
    }
  }


  //Metodo a llamar cuando se toca el boton delete
  deletePaint(paint: IPainting) {
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.auth.authToken
    })
    this.confirm.confirm({
        message: 'Are you sure you want to delete ' + paint.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.PaintingServ.deleteObject('cuadro-viewset/'+paint.id,{headers:headers})
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Paint Deleted', life: 3000});
            this.loadDataView()
        }
    });
  }

  //Este evento tiene que ver con cambiar el tipo de ordenamiento en el DataView
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  //Este evento se activa cuando subes una imagen
  OnImageChanged(event:any)  {
    this.image = event.target.files[0];
    this.paint.img = event.target.files[0];
  }
}

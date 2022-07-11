import { Component, OnInit } from '@angular/core';
import { IPainting } from 'src/app/interfaces/IPainting';
import {ApiService} from 'src/app/services/api.service'
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {SelectItem} from 'primeng/api';
@Component({
  selector: 'app-paintings-list',
  templateUrl: './paintings-list.component.html',
  styleUrls: ['./paintings-list.component.css']
})
export class PaintingsListComponent implements OnInit {

  paint:IPainting
  paintings:IPainting[]

  paintDialog:boolean
  submitted:boolean

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private PaintingServ:ApiService,private auth:AuthService, private messageService:MessageService) { }

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


  //Por ahora esta vacia pero es lo que se ejecuta cuando el click event del boton save del dialog se toca
  savePaint(){}



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
}

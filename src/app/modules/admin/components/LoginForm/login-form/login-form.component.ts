import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {ILoginCredentials} from '../../../../../services/interfaz-loginCredentials'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  public IsLogged: boolean

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  get emailControl():FormControl{
    return this.loginForm.get('username') as FormControl;
  }
  get passwordControl():FormControl{
    return this.loginForm.get('password') as FormControl
  }


  constructor(private authService: AuthServiceService) {
    this.IsLogged = false;
  }

  ngOnInit(): void {
  }
  signIn(): void{
    const credentials = this.loginForm.value
    console.log(credentials)
    this.loginForm.markAsPending()

    this.authService.login(credentials).subscribe({
      error:(err)=>this.loginForm.setErrors({invalidCredentials: true})
    })

  }
}

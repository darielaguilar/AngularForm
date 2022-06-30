import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public IsLogged: boolean

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  get emailControl():FormControl{
    return this.registerForm.get('username') as FormControl;
  }
  get passwordControl():FormControl{
    return this.registerForm.get('password') as FormControl
  }


  constructor(private authService: AuthService) {
    this.IsLogged = false;
  }

  ngOnInit(): void {
  }
  signIn(): void{
    const credentials = this.registerForm.value
    console.log(credentials)
    this.registerForm.markAsPending()

    // this.authService.register(credentials).subscribe({
    //   error:(err)=>this.registerForm.setErrors({invalidCredentials: true})
    // })
  }
}

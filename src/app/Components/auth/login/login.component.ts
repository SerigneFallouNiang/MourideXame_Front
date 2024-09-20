import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserModel } from '../../../Models/user.model';
import { AlertShowMessage } from '../../../Services/alretMessage';
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe((data: any) => {
        if(this.authService.isLoggedIn()){
          this.router.navigate(['/admin']);
        }
        console.log(data);
      });
    }
  }









  // userObject: UserModel = {};
  // loginForm!: FormGroup; 
  // alertMessage: string = '';
  // userObject: UserModel = {}; 

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {}

  // ngOnInit() {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });

  //   console.log(this.loginForm);
  // }


  

  // onSubmit(){
  //   if(this.loginForm.valid){
  //     this.authService.login(this.loginForm.value).subscribe(
  //       (response:any) => {

  //         if(response.success){
  //           localStorage.setItem('infos_connexion', JSON.stringify(response));
  //           const user = response.user;
  //           if(user.role == 'admin'){
  //             this.router.navigateByUrl('/accueilMembre');
  //           }else {
  //             this.router.navigateByUrl('/livres');
  //           }
  //         }
  //       },
  //       (error) => {
  //         console.error('Erreur de connexion:', error);
  //         this.alertMessage = error.error.message || "Une erreur s'est produite lors de la connexion";
  //         // this.AlertShowMessage('alert-danger');
  //       }
  //     )
      
  //   }
  // }

 


}

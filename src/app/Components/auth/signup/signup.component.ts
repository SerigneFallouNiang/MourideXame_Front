import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService  =  inject(AuthService);
  router  =  inject(Router);
  showPassword = false;
  showConfirmPassword = false;
  errorMessage: string = '';

  // Fonction d'inscription 
  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password_confirmation: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]),
    locale: new FormControl('fr', [Validators.required]) 
  })


  // public onSubmit() {
  //   if (this.signupForm.valid) {
  //     console.log(this.signupForm.value);
  //     this.authService.signup(this.signupForm.value)
  //       .subscribe({
  //         next: (data: any) => {
  //           console.log(data);
  //           this.router.navigate(['/login']);
  //         },
  //         error: (err) => console.log(err)
  //       });
  //   }else {
  //     this.signupForm.markAllAsTouched();  // This will mark all fields as touched to show errors
  //   }
  // }
  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
            }
          }
        });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }


//fonction de visualisation du mot de passe
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //fonction de visualisation du confirmation mot de passe
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
}

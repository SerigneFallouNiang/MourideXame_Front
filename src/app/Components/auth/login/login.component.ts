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

  // Propriété pour stocker le message d'erreur
  errorMessage: string = '';  

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  // onSubmit(){
  //   if(this.loginForm.valid){
  //     console.log(this.loginForm.value);
  //     this.authService.login(this.loginForm.value)
  //     .subscribe((data: any) => {
  //       if(this.authService.isLoggedIn()){
  //         this.router.navigate(['/accueil']);
  //       }
  //       console.log(data);
  //     });
  //   }
  // }


  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          if (data.status) {
            const roles = data.roles;  // Récupérer les rôles depuis la réponse API
            
            // Redirection en fonction du rôle
            if (roles.includes('apprenant')) {
              this.router.navigate(['/accueil']);
            } else if (roles.includes('visiteur')) {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/default-page']);  // Par défaut, si aucun rôle spécifique
            }
          }else {
            // Si la réponse n'a pas de statut valide, afficher un message d'erreur
            this.errorMessage = 'Identifiants incorrects.';
          }
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Email ou mot de passe incorrect';  // Message d'erreur personnalisé
        }
      );
    }else {
      // Si le formulaire est invalide, afficher un message d'erreur
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
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

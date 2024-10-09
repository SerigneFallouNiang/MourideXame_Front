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
  // masque et démasque du password 
  showPassword = false;
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })



  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          if (data.status) {
            const user = data.user;  // Récupérer les informations de l'utilisateur
            const roles = data.roles;  // Récupérer les rôles depuis la réponse API
            const token = data.token;  // Récupérer les rôles depuis la réponse API

            // Stocker les informations de l'utilisateur dans le localStorage
            localStorage.setItem('authUser', JSON.stringify({ user, roles , token}));  
            
            // Redirection en fonction du rôle
            if (roles.includes('apprenant')) {
              this.router.navigate(['/accueil']);
            } else if (roles.includes('admin')) {
              this.router.navigate(['/dashbord-admin']);
            } else {
              this.router.navigate(['/accueil']);  // Par défaut, si aucun rôle spécifique
            }
          }else {
            // Si la réponse n'a pas de statut valide, afficher un message d'erreur
            // this.errorMessage = 'Identifiants incorrects.';
            this.displayError('Identifiants incorrects.');
          }
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          // this.errorMessage = 'Email ou mot de passe incorrect'; 
          this.displayError('Email ou mot de passe incorrect');
        }
      );
    }else {
      // Si le formulaire est invalide, afficher un message d'erreur
      // this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      this.displayError('Veuillez remplir tous les champs correctement.');
    }
  }
  
// fonction pour masqué et démasqué le password 
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
 

  // Fonction pour afficher un message d'erreur temporairement
  displayError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);  // Efface le message après 2 secondes
  }

}

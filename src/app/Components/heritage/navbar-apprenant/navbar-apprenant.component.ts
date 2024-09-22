import { Component, inject } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/user.model';

@Component({
  selector: 'app-navbar-apprenant',
  standalone: true,
  imports: [],
  templateUrl: './navbar-apprenant.component.html',
  styleUrl: './navbar-apprenant.component.css'
})
export class NavbarApprenantComponent {
  // private router = inject(Router);
  // private authService = inject(AuthService);

  // // Déclaration des variables 
  // connexionInfos: any;
  // userConnected: UserModel = {};

  // ngOnInit(): void {
  //   this.loadUserInfo();
  // }

  // private loadUserInfo() {
  //   if (localStorage.getItem("authUser")) {
  //     this.connexionInfos = JSON.parse(localStorage.getItem("authUser") || "");
  //     this.userConnected = this.connexionInfos.user;
  //     console.log(this.userConnected);
  //   } else {
  //     this.authService.getProfile().subscribe(
  //       (user: UserModel) => {
  //         this.userConnected = user;
  //         console.log(this.userConnected);
  //         localStorage.setItem("authUser", JSON.stringify({ user })); // Stocke dans localStorage
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des informations de l’utilisateur', error);
  //       }
  //     );
  //   }
  // }

  // // Déconnexion
  // logout() {
  //   this.authService.logout();
  //   localStorage.removeItem("authUser");
  //   this.router.navigateByUrl("/connexion");
  // }
}

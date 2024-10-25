import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token;
  let user;

   // Récupération des infos de connexion de l'utilisateur au niveau du localStorage
   if (typeof window !== 'undefined' && localStorage.getItem('authUser')) {
   const infosConnexion = JSON.parse(localStorage.getItem('authUser') || "{}");
   if (infosConnexion) {
     token = infosConnexion.token;
     user = infosConnexion.user;
   }
  }


  // Vérifier si l'utilisateur a le rôle admin
  if (!token || !user || !user.roles.some((role: any) => role.name === "admin")) {
    router.navigateByUrl("/login");
    return false;
  }

  return true;
};

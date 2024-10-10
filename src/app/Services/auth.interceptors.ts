import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpHeaders } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const platformId = inject(PLATFORM_ID);
  let token = "";

  // Vérifie si l'application s'exécute dans un navigateur
  if (isPlatformBrowser(platformId)) {
    // Récupération des informations de connexion depuis le localStorage (uniquement côté navigateur)
    const storedData = localStorage.getItem('infos_Connexion');
    if (storedData) {
      const infos = JSON.parse(storedData || "");
      if (infos && infos.access_token) {
        token = infos.access_token;
      }
    }
  }

  // Si aucun token n'est trouvé, on renvoie la requête originale
  if (!token) {
    return next(req);
  }

  // Création des en-têtes avec le token d'authentification
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  // Clone la requête en ajoutant les en-têtes d'authentification
  const newReq = req.clone({
    headers
  });

  // Renvoie la requête modifiée
  return next(newReq);
};
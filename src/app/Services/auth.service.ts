import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private http = inject(HttpClient);

    signup(data: any) {
        return this.http.post(`${apiUrl}/register`, data);
      }

      login(data: any) {
        return this.http.post(`${apiUrl}/login`, data)
          .pipe(tap((result) => {
            localStorage.setItem('authUser', JSON.stringify(result));
          }));
      }


      logout() {
        localStorage.removeItem('authUser');
      }

      isLoggedIn() {
        return localStorage.getItem('authUser') !== null;
      }

      // AuthService
      getProfile() {
        return this.http.get(`${apiUrl}/profile`);
      }

    // // Methode pour s'authetifier 
    // login(identifiant:any){
    //     return this.http.post(`${apiUrl}/login`, identifiant);
    // }
    
    // // Methode s'inscrire 
    // register(identifiant:any){
    //     return this.http.post(`${apiUrl}/register`, identifiant);
    // }
    
    // // Methode pour avoir le profil utilisateur 
    // getProfile(){
    //     return this.http.get(`${apiUrl}/profile`);
    // }

    // // Methode pour rafraichir le token
    // refreshToken(){
    //     return this.http.get(`${apiUrl}/refresh`);
    // }

    // // Methode pour se deconnecter 
    // logout(){
    //     return this.http.get(`${apiUrl}/logout`);
    // }
}
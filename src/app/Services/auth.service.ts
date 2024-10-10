import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private http = inject(HttpClient);

    signup(data: any) {
        return this.http.post(`${apiUrl}/register`, data);
      }

      // Methode pour s'authetifier 
      login(identifiant:any){
        return this.http.post(`${apiUrl}/login`, identifiant);
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

      // updateProfile(userData: Partial<UserModel>): Observable<UserModel> {
      //   return this.http.put<UserModel>(`${this.apiUrl}/update-profile`, userData);
      // }

      updateProfile(userData: FormData): Observable<any> {
        const authUser = localStorage.getItem('authUser');
        let headers = new HttpHeaders();
        
        if (authUser) {
          const parsedUser = JSON.parse(authUser);
          const token = parsedUser.token;
          if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
          }
        }
    
        return this.http.post(`${apiUrl}/update-profile`, userData, { headers });
      }
      

      setLanguage(language: string) {
        return this.http.post(`${apiUrl}/set-language`, { language });
      }

      countUser(): Observable<any> {
        return this.http.get(`${apiUrl}/nomber-user`);
      }


}
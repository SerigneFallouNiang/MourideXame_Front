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

      // updateProfile(userData: Partial<UserModel>): Observable<UserModel> {
      //   return this.http.put<UserModel>(`${this.apiUrl}/update-profile`, userData);
      // }

      updateProfile(userData: FormData) {
        const authUser = localStorage.getItem('authUser'); 
        let headers = new HttpHeaders();
        
        if (authUser) {
          const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
          const token = parsedUser.token; // Extract the token
          
          if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
          }
        }
        return this.http.post(`${apiUrl}/update-profile`, userData, { headers });
      }

      setLanguage(language: string) {
        const authUser = localStorage.getItem('authUser'); 
        let headers = new HttpHeaders();
    
        if (authUser) {
          const parsedUser = JSON.parse(authUser);
          const token = parsedUser.token;
    
          if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
          }
        }
    
        return this.http.post(`${apiUrl}/set-language`, { language }, { headers });
      }

      countUser(): Observable<any> {
        const authUser = localStorage.getItem('authUser'); 
        let headers = new HttpHeaders();
        
        if (authUser) {
          const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
          const token = parsedUser.token; // Extract the token
          
          if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
          }
        }
        return this.http.get(`${apiUrl}/nomber-user`, { headers });
      }


}
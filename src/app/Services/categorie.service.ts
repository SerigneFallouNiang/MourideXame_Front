import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http = inject(HttpClient);

    // Methode pour recuperer toutes les categories 
    getAllCategorie(){
      const authUser = localStorage.getItem('authUser'); 
      let headers = new HttpHeaders();
      
      if (authUser) {
        const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
        const token = parsedUser.token; // Extract the token
        
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return this.http.get(`${apiUrl}/categories`, { headers });
  }

}

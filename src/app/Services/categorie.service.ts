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


  getCategorieAdmin(){
    return this.http.get(`${apiUrl}/categories`);
  }



  getCategoryById(id: string) {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();

    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/categories/${id}`, { headers });
}


  createCategory(categoryData: FormData) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.post(`${apiUrl}/categories`, categoryData, { headers });
  }

  updateCategory(id: string, categoryData: FormData) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.post(`${apiUrl}/categories/${id}`, categoryData, { headers });
  }

  deleteCategorie(categoryId: string) {
    return this.http.delete(`${apiUrl}/categories/${categoryId}`);
  }
}

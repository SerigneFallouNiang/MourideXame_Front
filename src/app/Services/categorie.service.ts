import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http = inject(HttpClient);

    // Methode pour recuperer toutes les categories 
    getAllCategorie(){
      return this.http.get(`${apiUrl}/categories`);
  }


  getCategorieAdmin(){
    return this.http.get(`${apiUrl}/categories`);
  }



  getCategoryById(id: string) {
    return this.http.get(`${apiUrl}/categories/${id}`);
}



  createCategory(categoryData: FormData) {
    return this.http.post(`${apiUrl}/categories`, categoryData);
  }

  updateCategory(id: string, categoryData: FormData) {
    return this.http.post(`${apiUrl}/categories/${id}`, categoryData);
  }

  deleteCategorie(categoryId: string) {
    return this.http.delete(`${apiUrl}/categories/${categoryId}`);
  }


  countCategories(): Observable<any> {
    return this.http.get(`${apiUrl}/categories/count`);
  }
}

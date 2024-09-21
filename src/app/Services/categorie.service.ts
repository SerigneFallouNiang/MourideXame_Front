import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http = inject(HttpClient);

    // Methode pour recuperer toutes les categories 
    getAllCategorie(){
      return this.http.get(`${apiUrl}/categories`);
  }

    // Methode pour recuperer les livres d'une categorie
    // getBooksByCategory(categoryId: string) {
    //   return this.http.get(`${apiUrl}/categories/${categoryId}/books`);
    // }
}

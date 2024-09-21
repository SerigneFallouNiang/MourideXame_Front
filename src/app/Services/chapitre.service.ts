import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ChapitreService {
  constructor(private http: HttpClient) { }



  getAllChapters(): Observable<any> {
    return this.http.get(`${apiUrl}/chapters`);
  }

  // Methode pour recuperer les chapitre d'une book
  getBooksByBook(bookId: string) {
    return this.http.get(`${apiUrl}/books/${bookId}/chapters`);
  }


}

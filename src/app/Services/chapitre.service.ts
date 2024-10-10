import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getBooksByBook(bookId: string): Observable<any> {
    return this.http.get(`${apiUrl}/books/${bookId}/chapters`);
  }

  // Methode pour marquer un chapitre comme lu
  // markChapterAsRead(chapterId: string): Observable<any> {
  //   return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {});
  // }

  markChapterAsRead(chapterId: number): Observable<any> {
    return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {});
  }


  deleteChapitre(chapterId: string) {
    return this.http.delete(`${apiUrl}/chapters/${chapterId}`);
  }



  // Créer une nouvelle question
  createChapitre(chapitreData: any): Observable<any> {
    return this.http.post(`${apiUrl}/chapters`, chapitreData);
  }

  // Mettre à jour une question existante
  updateChapitre(chapitreId: string, chapitreData: any): Observable<any> {
    return this.http.post(`${apiUrl}/chapters/${chapitreId}`, chapitreData);
  }

  //edit chapiter
  getChapitreById(chapitreId: string): Observable<any> {
    return this.http.get(`${apiUrl}/chapters/${chapitreId}`);
  }

}

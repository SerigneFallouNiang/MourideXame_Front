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
    const headers = this.getAuthHeaders();
    return this.http.get(`${apiUrl}/books/${bookId}/chapters`, { headers });
  }

  // Methode pour marquer un chapitre comme lu
  // markChapterAsRead(chapterId: string): Observable<any> {
  //   return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {});
  // }

  markChapterAsRead(chapterId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {}, { headers });
  }


  deleteChapitre(chapterId: string) {
    return this.http.delete(`${apiUrl}/chapters/${chapterId}`);
  }



  // Créer une nouvelle question
  createChapitre(chapitreData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${apiUrl}/chapters`, chapitreData, { headers });
  }

  // Mettre à jour une question existante
  updateChapitre(chapitreId: string, chapitreData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${apiUrl}/chapters/${chapitreId}`, chapitreData, { headers });
  }

  //edit chapiter
  getChapitreById(chapitreId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${apiUrl}/chapters/${chapitreId}`, { headers });
  }


   // Méthode pour récupérer les headers avec le token
private getAuthHeaders(): HttpHeaders {
  const authUser = localStorage.getItem('authUser');
  let headers = new HttpHeaders();
  if (authUser) {
    const parsedUser = JSON.parse(authUser);
    const token = parsedUser.token;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return headers;
}
}

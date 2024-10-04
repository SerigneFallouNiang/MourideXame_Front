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
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/books/${bookId}/chapters`, { headers });
  }

  // Methode pour marquer un chapitre comme lu
  // markChapterAsRead(chapterId: string): Observable<any> {
  //   return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {});
  // }

  markChapterAsRead(chapterId: number): Observable<any> {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return this.http.post(`${apiUrl}/chapters/${chapterId}/mark-read`, {}, { headers });
  }


  
}

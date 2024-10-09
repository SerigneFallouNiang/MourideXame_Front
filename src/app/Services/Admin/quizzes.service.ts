import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient) {}


  getAllQuiz(): Observable<any> {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/admin/quizzes`, { headers });
  }



  
    // Charger une question par ID
    getQuizById(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get(`${apiUrl}/quizzes/${id}`, { headers });
    }

      // Créer une nouvelle quizz
      createQuiz(questionData: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${apiUrl}/quizzes`, questionData, { headers });
      }
  
  
      // Mettre à jour une quizz existante
      updateQuiz(id: string, questionData: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put(`${apiUrl}/quizzes/${id}`, questionData, { headers });
      }

       // Method to submit quiz answers
      deleteQuiz(quizId: string) {
        return this.http.delete(`${apiUrl}/quizzes/${quizId}`);
      }

       // Nouvelle méthode pour obtenir les détails d'un quiz
  getQuizDetails(chapterId: string): Observable<any> {
    return this.http.get(`${apiUrl}/quiz/start/${chapterId}`);
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

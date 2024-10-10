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
    return this.http.get(`${apiUrl}/admin/quizzes`);
  }



  
    // Charger une question par ID
    getQuizById(id: string): Observable<any> {
      return this.http.get(`${apiUrl}/quizzes/${id}`);
    }

      // Créer une nouvelle quizz
      createQuiz(questionData: any): Observable<any> {
        return this.http.post(`${apiUrl}/quizzes`, questionData);
      }
  
  
      // Mettre à jour une quizz existante
      updateQuiz(id: string, questionData: any): Observable<any> {
        return this.http.put(`${apiUrl}/quizzes/${id}`, questionData);
      }

       // Method to submit quiz answers
      deleteQuiz(quizId: string) {
        return this.http.delete(`${apiUrl}/quizzes/${quizId}`);
      }

       // Nouvelle méthode pour obtenir les détails d'un quiz
  getQuizDetails(chapterId: string): Observable<any> {
    return this.http.get(`${apiUrl}/quiz/start/${chapterId}`);
  }

}

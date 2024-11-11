import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http: HttpClient) { }

  // Method to get quiz based on chapterId
  getQuizz(chapterId: string | null) {
    return this.http.get(`${apiUrl}/quiz/start/${chapterId}`);
  }


  submitQuizz(quizId: string | null, answers: any) {
    return this.http.post(`${apiUrl}/quiz/submit/${quizId}`, { answers });
  }

  getPassedQuiz(quizId: string): Observable<any> {
    return this.http.get(`${apiUrl}/quiz/passed/${quizId}`);
  }


  //pour la disponiblité du quiz
  getLastAttempt(quizId: string): Observable<any> {
    return this.http.get(`${apiUrl}/quizzes/${quizId}/last-attempt`).pipe(
      catchError((error) => {
        // Gérer l'erreur et la retransmettre
        console.error('Erreur lors de la vérification de la disponibilité:', error);
        return throwError(() => error);
      })
    );
  }
  
}

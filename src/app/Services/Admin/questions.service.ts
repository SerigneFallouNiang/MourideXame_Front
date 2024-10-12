import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class QuestionssService {

  constructor(private http: HttpClient) {}


  getAllQuestions(): Observable<any> {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/questions`, { headers });
  }


    // Charger une question par ID
    getEditById(id: string): Observable<any> {
      return this.http.get(`${apiUrl}/questions/${id}`);
    }


    // Créer une nouvelle question
    createQuestion(questionData: any): Observable<any> {
      return this.http.post(`${apiUrl}/questions`, questionData);
    }

  // récupération des question et réponse par id 
    getChapitreAndAnswerbyId(id: string): Observable<any> {
      return this.http.post(`${apiUrl}/questions/${id}`, {});
    }

    // Mettre à jour une question existante
    updateQuestion(id: string, questionData: any): Observable<any> {
      return this.http.put(`${apiUrl}/questions/${id}`, questionData);
    }

    deleteQuestion(questionId: string) {
      return this.http.delete(`${apiUrl}/questions/${questionId}`);
    }


    deleteAnswer(answerId: number): Observable<any> {
      return this.http.delete(`${apiUrl}/answers/${answerId}`);
    }

}

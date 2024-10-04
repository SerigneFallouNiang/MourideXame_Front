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


  // creatQuestions(): Observable<any> {
  //   const authUser = localStorage.getItem('authUser');
  //   let headers = new HttpHeaders();
  //   if (authUser) {
  //     const parsedUser = JSON.parse(authUser);
  //     const token = parsedUser.token;
  //     if (token) {
  //       headers = headers.set('Authorization', `Bearer ${token}`);
  //     }
  //   }
  //   return this.http.post(`${apiUrl}/questions`, { headers });
  // }


  // updateQuestions(id: string, questionData: FormData) {
  //   const authUser = localStorage.getItem('authUser'); 
  //   let headers = new HttpHeaders();
    
  //   if (authUser) {
  //     const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
  //     const token = parsedUser.token; // Extract the token
      
  //     if (token) {
  //       headers = headers.set('Authorization', `Bearer ${token}`);
  //     }
  //   }
  //   return this.http.post(`${apiUrl}/questions/${id}`, questionData, { headers });
  // }

    // Charger une question par ID
    getEditById(id: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get(`${apiUrl}/questions/${id}`, { headers });
    }


    // Créer une nouvelle question
    createQuestion(questionData: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post(`${apiUrl}/questions`, questionData, { headers });
    }
  
    // Mettre à jour une question existante
    updateQuestion(id: string, questionData: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put(`${apiUrl}/questions/${id}`, questionData, { headers });
    }

    deleteQuestion(questionId: string) {
      return this.http.delete(`${apiUrl}/questions/${questionId}`);
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

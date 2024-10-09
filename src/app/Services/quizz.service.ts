import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http: HttpClient) { }

  // Method to get quiz based on chapterId
  getQuizz(chapterId: string | null) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/quiz/start/${chapterId}`, { headers });
  }

 

   // Soumettre les réponses au quiz avec le token JWT
  //  submitQuizz(quizId: string | null, answers: any) {
  //   const token = localStorage.getItem('token'); // Récupérer le token JWT
  //   let headers = new HttpHeaders();
  //   console.log('token :',token);
  //   if (token) {
  //     headers = headers.set('Authorization', `Bearer ${token}`);
  //   }
    
  //   return this.http.post(`${apiUrl}/quiz/submit/${quizId}`, { answers }, { headers });
  // }

  submitQuizz(quizId: string | null, answers: any) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
  
    return this.http.post(`${apiUrl}/quiz/submit/${quizId}`, { answers }, { headers });
  }
  
}

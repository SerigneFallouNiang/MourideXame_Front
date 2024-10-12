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
    return this.http.get(`${apiUrl}/quiz/start/${chapterId}`);
  }


  submitQuizz(quizId: string | null, answers: any) {
    return this.http.post(`${apiUrl}/quiz/submit/${quizId}`, { answers });
  }
  
}

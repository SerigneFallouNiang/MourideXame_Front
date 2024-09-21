import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getBooksByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${apiUrl}/categories/${categoryId}/books`);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${apiUrl}/books`);
  }

  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${apiUrl}/books/${bookId}`);
  }

}
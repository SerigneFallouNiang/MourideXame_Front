import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  

  // getAllBooks(): Observable<any> {
  //   return this.http.get(`${apiUrl}/books`);
  // }
  getAllBooks(): Observable<any> {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/books`, { headers });
  }

  

  getBookById(bookId: string): Observable<any> {
    const authUser = localStorage.getItem('authUser'); 

    return this.http.get(`${apiUrl}/books/${bookId}/chapters`);
  }



  getHistoryUser(): Observable<any> {
    return this.http.get(`${apiUrl}/books/read-chapters/user`);
  }




  createBook(bookData: FormData) {
    return this.http.post(`${apiUrl}/books`, bookData);
  }

  updateBook(id: string, bookData: FormData) {
    return this.http.post(`${apiUrl}/books/${id}`, bookData);
  }

  deleteBook(bookId: string) {
    return this.http.delete(`${apiUrl}/books/${bookId}`);
  }



  getEditById(bookId: string): Observable<any> {
    return this.http.get(`${apiUrl}/books/${bookId}`);
  }


  countBooks(): Observable<any> {
    return this.http.get(`${apiUrl}/books/count`);
  }
}

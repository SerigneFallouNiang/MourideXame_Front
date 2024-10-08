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
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/categories/${categoryId}/books`, { headers });
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



  getHistoryUser(): Observable<any> {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/books/read-chapters/user`, { headers });
  }





  createBook(bookData: FormData) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.post(`${apiUrl}/books`, bookData, { headers });
  }

  updateBook(id: string, bookData: FormData) {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.post(`${apiUrl}/books/${id}`, bookData, { headers });
  }

  deleteBook(bookId: string) {
    return this.http.delete(`${apiUrl}/books/${bookId}`);
  }



  getEditById(bookId: string): Observable<any> {
    const authUser = localStorage.getItem('authUser'); 
    let headers = new HttpHeaders();
    
    if (authUser) {
      const parsedUser = JSON.parse(authUser); // Parse the stored JSON object
      const token = parsedUser.token; // Extract the token
      
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/books/${bookId}`, { headers });
  }


  countBooks(): Observable<any> {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/books/count`, { headers });
  }
}

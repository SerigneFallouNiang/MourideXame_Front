import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) {}



  getRoles(page: number = 1): Observable<any> {
    return this.http.get(`${apiUrl}/roles?page=${page}`);
  }

  createRole(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/roles`,data);
  }


  getAllUsers(): Observable<any> {
    const authUser = localStorage.getItem('authUser');
    let headers = new HttpHeaders();
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      const token = parsedUser.token;
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(`${apiUrl}/utilisateurs`, { headers });
  }
  
  
}

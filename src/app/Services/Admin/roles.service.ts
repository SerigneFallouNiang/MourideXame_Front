import { HttpClient } from '@angular/common/http';
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
}

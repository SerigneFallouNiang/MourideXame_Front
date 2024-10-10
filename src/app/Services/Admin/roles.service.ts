import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) {}



  getRoles(): Observable<any> {
    return this.http.get(`${apiUrl}/roles`);
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
  
   // Récupérer tous les rôles
   getAllRoles(): Observable<any> {
    return this.http.get(`${apiUrl}/roles`);
  }

   // Mettre à jour une quizz existante
   updateRole(id: string, roleData: any): Observable<any> {
    return this.http.put(`${apiUrl}/roles/${id}`, roleData);
  }

  getRoleById(id: string) {
    return this.http.get(`${apiUrl}/roles/${id}`);
  }
  
  getAllPermissions() {
    return this.http.get(`${apiUrl}/permissions`);
  }

     // Method to submit quiz answers
     deleteRole(roleId: string) {
      return this.http.delete(`${apiUrl}/roles/${roleId}`);
    }




        updateUserRole(userId: string, roleId: string): Observable<any> {
          return this.http.put(`${apiUrl}/updateRole/${userId}`, 
            { roleId: roleId }
          );
        }



        //pour visualiser l'historie d'un utilisateur
  getUserHistory(userId: string): Observable<any> {
    return this.http.get(`${apiUrl}/books/read-chapters/user/${userId}`);
  }
}

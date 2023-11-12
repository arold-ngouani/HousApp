import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getById(id: any) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  register(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  update(id: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + id, inputData);
  }

  delete(id: any) {
    return this.http.delete(this.apiUrl + '/' +id);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username')!=null;
  }

  getRole() {
    return sessionStorage.getItem('userrole')!=null ? sessionStorage.getItem('userrole')?.toString(): '';
  }
  
}

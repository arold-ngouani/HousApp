import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { Menu } from '../interfaces/menu';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  registerUser(inputdata:any): Observable<any>{
    return this.http.post(this.apiurl,inputdata)
  }
  getUserByCode(id:any): Observable<any>{
    return this.http.get(this.apiurl+'/'+id);
  }
  getAll():Observable<any>{
    return this.http.get(this.apiurl);
  }
  updateUser(id:any,inputdata:any): Observable<any>{
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getUserRole(): Observable<any>{
    return this.http.get('http://localhost:3000/role');
  }
  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  getRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  getAllCustomer(): Observable<any>{
    return this.http.get('http://localhost:3000/customer');
  }
  getAccessByRole(role:any,menu:any): Observable<any>{
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
  deleteUser(id: User): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }
}

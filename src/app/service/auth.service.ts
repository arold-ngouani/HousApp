import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { Menu } from '../interfaces/menu';
import { User } from '../interfaces/user';
import { Customer } from '../interfaces/customer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  registerUser(inputdata:any): Observable<User>{
    return this.http.post<User>(this.apiurl,inputdata)
  }
  getUserByCode(id:any): Observable<User>{
    return this.http.get<User>(this.apiurl+'/'+id);
  }
  getAll():Observable<User[]>{
    return this.http.get<User[]>(this.apiurl);
  }
  updateUser(id:any,inputdata:any): Observable<User>{
    return this.http.put<User>(this.apiurl+'/'+id,inputdata);
  }
  getUserRole(): Observable<Role>{
    return this.http.get<Role>('http://localhost:3000/role');
  }
  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  getRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>('http://localhost:3000/customer');
  }
  getAccessByRole(role:any,menu:any): Observable<Role>{
    return this.http.get<Role>('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
  deleteUser(id: User): Observable<User> {
    return this.http.delete<User>(`http://localhost:3000/user/${id}`);
  }

  deleteCustomer(id: User): Observable<Customer> {
    return this.http.delete<Customer>(`http://localhost:3000/customer/${id}`);
  }
}

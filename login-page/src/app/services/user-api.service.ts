import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { } 

  getUsers() {
    return this.http.get(this.url)
  }

  getUsersById(id: string) {
    return this.http.get(this.url+'/'+id)
  }

  addUsers(user: User) {
    return this.http.post(this.url+'/new', user)
  }

  editUsers(id: string, user: User) {
    return this.http.put(this.url+'/'+id, user)
  }
}

export interface User{
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  tel?: string;
  cpf?: string;
  acess?: string;
  active?: string;
}

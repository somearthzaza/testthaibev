import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetUser(): Observable<{ data: User[], status: number }> {
    const URL = environment.apiUrl + '/users';
    return this.http.get<{ data: User[], status: number }>(URL);
  }

  CreateUser(user : User) {
    const URL = environment.apiUrl + '/users';
    return this.http.post<User>(URL, user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseToken, User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = '/api/';

  constructor(private http: HttpClient) {}

  login(data: User) {
    return this.http.post<ResponseToken>(this.baseUrl + 'auth/token/login/', data,  {
      headers: {'Access-Control-Allow-Origin': '*'}
    })
  }
}

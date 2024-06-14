import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseToken, User } from '../model/user.model';
import { catchError } from 'rxjs';
import { ErrorHandlingService } from '../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = '/api/';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {}

  login(data: User) {
    return this.http.post<ResponseToken>(this.baseUrl + 'auth/token/login/', data).pipe(
      catchError((err) => this.errorHandlingService.handleError(err))
    )
  }
}

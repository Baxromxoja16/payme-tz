import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject, tap, catchError } from 'rxjs';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { ListOfUsers, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = '/api/todo'
  token = localStorage.getItem('token');
  todoChanged = new Subject<UserModel>();
  listOfUsers: WritableSignal<ListOfUsers> = signal<ListOfUsers>({} as ListOfUsers);
  detailUser: WritableSignal<UserModel> = signal<UserModel>({} as UserModel)

  constructor(
    private http: HttpClient,
    private errorHandle: ErrorHandlingService) { }

  getTodos() {
    return this.http.get<ListOfUsers>(this.baseUrl).pipe(
      tap((list) => {
        this.listOfUsers.set(list);
      }),
      catchError((err) => this.errorHandle.handleError(err))
    );
  }

  getDetailTodo(id: string) {
    return this.http.get<UserModel>(this.baseUrl + '/' + id).pipe(
      tap((res) => this.detailUser.set(res)),
      catchError((err) => this.errorHandle.handleError(err))
    );
  }

  createTodo(data: UserModel) {
    return this.http.post(this.baseUrl, data).pipe(
      catchError((err) => this.errorHandle.handleError(err))
    );
  }

  editTodo(id: string, data: UserModel) {
    return this.http.put(this.baseUrl + '/' + id, data).pipe(
      catchError((err) => this.errorHandle.handleError(err))
    );
  }

  deleteTodo(id: string) {
    return this.http.delete(this.baseUrl + '/' + id).pipe(
      tap(() => {
        let idIndex = this.listOfUsers().results.findIndex((list) => list.id === id);
        this.listOfUsers().results.splice(idIndex, 1);
      },
        catchError((err) => this.errorHandle.handleError(err))
      )
    );
  }

}

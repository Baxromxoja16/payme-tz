import { CommonModule } from '@angular/common';
import { Component, OnDestroy, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialsModule } from '../../core/materials.module';
import { UserModel } from '../models/user.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [MaterialsModule, RouterLink, CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnDestroy{
  item: WritableSignal<UserModel> = this.todoService.detailUser;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private todoService: TodoService) { }

  ngOnInit(): void {
    let id = this.router.routerState.snapshot.url.split('/')[3];

    const subscribe = this.todoService.getDetailTodo(id).subscribe();
    this.subscription.add(subscribe);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

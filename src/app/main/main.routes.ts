import { Route } from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoComponent } from './todo/todo.component';


export const Main_Routes: Route[] = [
  {
    path: '', redirectTo: 'lists', pathMatch: 'full',
  },
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'detail/:id',
        component: TodoDetailComponent
      }
    ]
  },
]

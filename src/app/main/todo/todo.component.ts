import { Component } from '@angular/core';
import { FormComponent } from '../components/form/form.component';
import { ListsComponent } from '../components/lists/lists.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ListsComponent, FormComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}

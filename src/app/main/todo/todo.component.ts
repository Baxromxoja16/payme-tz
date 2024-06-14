import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from '../components/form/form.component';
import { ListsComponent } from '../components/lists/lists.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ListsComponent, FormComponent, RouterOutlet],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}

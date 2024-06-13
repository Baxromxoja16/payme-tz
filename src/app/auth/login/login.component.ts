import { Component } from '@angular/core';
import { MaterialsModule } from '../../core/materials.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'title'
  public isAuthenticated = false;

  public logout(): void {
    // todo
  }
}

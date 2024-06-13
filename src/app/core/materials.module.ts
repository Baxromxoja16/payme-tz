import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class MaterialsModule { }

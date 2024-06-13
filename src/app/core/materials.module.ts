import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule
  ],
  exports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class MaterialsModule { }

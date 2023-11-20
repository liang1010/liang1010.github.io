import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaintenanceModule } from '../maintenance.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComboBoxComponent } from './combo-box.component';
import { ComboBoxRoutingModule } from './combo-box.routing.module';


@NgModule({
  declarations: [
    ComboBoxComponent
  ],
  imports: [
    CommonModule,
    ComboBoxRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MaintenanceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
  ]
})
export class ComboBoxModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemVariableRoutingModule } from './system-variable.routing.module';
import { SystemVariableComponent } from './system-variable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaintenanceModule } from '../maintenance.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SystemVariableComponent
  ],
  imports: [
    CommonModule,
    SystemVariableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MaintenanceModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
  ]
})
export class SystemVariableModule { }

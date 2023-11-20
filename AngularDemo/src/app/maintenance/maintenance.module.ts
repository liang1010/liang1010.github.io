import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceGridComponent } from './maintenance-grid/maintenance-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaintenanceGridComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    MaintenanceGridComponent
  ]
})
export class MaintenanceModule { }

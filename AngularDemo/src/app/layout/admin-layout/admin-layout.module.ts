import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout.routing.module';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
  ],
  providers:[
  ]
})
export class AdminLayoutModule { }

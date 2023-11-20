import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout.component';
import { RouterModule } from '@angular/router';
import { PublicHeaderModule } from '../public-header/public-header.module';
import { PublicFooterModule } from '../public-footer/public-footer.module';
import { PublicLayoutRoutingModule } from './public-layout.routing.module';



@NgModule({
  declarations: [
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
    PublicHeaderModule,
    PublicFooterModule,
  ]
})
export class PublicLayoutModule { }

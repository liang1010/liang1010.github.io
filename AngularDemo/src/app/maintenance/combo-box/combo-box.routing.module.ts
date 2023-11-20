import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComboBoxComponent } from './combo-box.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: ComboBoxComponent,
    }])
  ],
  exports: [RouterModule]
})
export class ComboBoxRoutingModule { }

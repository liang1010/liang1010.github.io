import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemVariableComponent } from './system-variable.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: SystemVariableComponent,
    }])
  ],
  exports: [RouterModule]
})
export class SystemVariableRoutingModule { }

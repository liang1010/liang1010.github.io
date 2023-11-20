import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'system-variable',
    loadChildren: () => import('../maintenance/system-variable/system-variable.module').then(m => m.SystemVariableModule)
  },
  {
    path: 'combo-box',
    loadChildren: () => import('../maintenance/combo-box/combo-box.module').then(m => m.ComboBoxModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }

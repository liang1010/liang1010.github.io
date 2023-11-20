import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemVariable } from 'src/app/shared/models/system-variable.model';
import { MaintenanceService } from 'src/app/shared/services/maintenance.service';
import { MaintenanceAbstractComponent } from '../maintenance.abstract.component';
import { Util } from 'src/app/shared/services/util';
import { ConfigService } from 'src/app/shared/services/config.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-system-variable',
  templateUrl: './system-variable.component.html',
  styleUrls: ['./system-variable.component.css']
})
export class SystemVariableComponent extends MaintenanceAbstractComponent<SystemVariable> implements OnInit {

  baseUrl(mode) {
    return Util.joinUrl(
      [
        this.configService.configValue.apiUrl,
        this.configService.configValue.maintenance.systemVariable.api,
        this.configService.configValue.maintenance.systemVariable[mode],
      ]);
  }
  columns: any[] = [
    { field: 'code', width: 30 },
    { field: 'value', width: 70 },
  ];

  constructor(
    protected http: HttpClient,
    protected maintenanceService: MaintenanceService,
    protected configService: ConfigService,
    protected notificationService: NotificationService
  ) {
    super(maintenanceService, notificationService, http);
    this.maintenanceService.DeleteBtnDisable.next(true);
  }
  deleteDisable = true;
  get codeFC() { return <FormControl>this.form.get('code'); }
  get valueFC() { return <FormControl>this.form.get('value'); }

  ngOnInit(): void {
    super.ngOnInit();
    this.form._addControl("id", new FormControl('', Validators.required), true);
    this.form._addControl("code", new FormControl('', Validators.required), true);
    this.form._addControl("value", new FormControl('', Validators.required));
  }

  onAddClick() {
    console.log('add click');
    this.codeFC.enable();
    this.valueFC.enable();
  }

  onEditClick() {
    console.log('edit click');
    this.valueFC.enable();
  }
}

import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemVariable } from 'src/app/shared/models/system-variable.model';
import { MaintenanceService } from 'src/app/shared/services/maintenance.service';
import { MaintenanceAbstractComponent } from '../maintenance.abstract.component';
import { Util } from 'src/app/shared/services/util';
import { ConfigService } from 'src/app/shared/services/config.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ComboBox } from 'src/app/shared/models/combo-box.model';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent extends MaintenanceAbstractComponent<ComboBox> implements OnInit {

  baseUrl(mode) {
    return Util.joinUrl(
      [
        this.configService.configValue.apiUrl,
        this.configService.configValue.maintenance.comboBox.api,
        this.configService.configValue.maintenance.comboBox[mode],
      ]);
  }
  columns: any[] = [
    { field: 'category', width: 30 },
    { field: 'value', width: 20 },
    { field: 'description', width: 50 },
  ];

  constructor(
    protected http: HttpClient,
    protected maintenanceService: MaintenanceService,
    protected configService: ConfigService,
    protected notificationService: NotificationService
  ) {
    super(maintenanceService, notificationService, http);
    // this.maintenanceService.DeleteBtnDisable.next(true);
  }

  get categoryFC() { return <FormControl>this.form.get('category'); }
  get valueFC() { return <FormControl>this.form.get('value'); }
  get descriptionFC() { return <FormControl>this.form.get('description'); }

  ngOnInit(): void {
    super.ngOnInit();
    this.form._addControl("id", new FormControl('', Validators.required), true);
    this.form._addControl("category", new FormControl('', Validators.required), true);
    this.form._addControl("value", new FormControl('', Validators.required), true);
    this.form._addControl("description", new FormControl('', Validators.required), true);
  }

  onAddClick() {
    console.log('add click');
    this.categoryFC.enable();
    this.valueFC.enable();
    this.descriptionFC.enable();
  }

  onEditClick() {
    console.log('edit click');
    this.valueFC.enable();
    this.descriptionFC.enable();
  }
}

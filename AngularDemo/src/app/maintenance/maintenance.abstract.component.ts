import { MatTableDataSource } from '@angular/material/table';
import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MaintenanceService } from 'src/app/shared/services/maintenance.service';
import { FormGroup } from '@angular/forms';
import { CustomFormGroup } from '../shared/components/form-group';
import { SubscriptionBase } from '../shared/components/subscription-base';
import { pairwise, takeUntil } from 'rxjs';
import { MaintenenceMode } from '../shared/models/enum';
import { NotificationService } from '../shared/services/notification.service';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { PagedListingResponse } from '../shared/models/paged.listing.response';
import { PageListingRequest } from '../shared/models/page.listing.request';
import { HttpClient } from '@angular/common/http';

@Component({
  template: ''
})
export abstract class MaintenanceAbstractComponent<T> extends SubscriptionBase implements OnInit, AfterContentInit, OnDestroy {
  faScrewdriverWrench = faScrewdriverWrench
  abstract columns: any[];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  form: CustomFormGroup = new CustomFormGroup({});
  totalRow: number = 0;

  constructor(
    protected maintenanceService: MaintenanceService,
    protected notificationService: NotificationService,
    protected http: HttpClient,
  ) {
    super();
  }

  ngOnInit() {
    this.maintenanceService.dataSource.next(this.dataSource);
    this.maintenanceService.columns.next(this.columns);
    this.maintenanceService.totalRow.next(this.totalRow);
    this.maintenanceService.onAddClick.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset();
        this.onAddClick()
      });
    this.maintenanceService.onEditClick.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onEditClick()
      });
    this.maintenanceService.onDeleteClick.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.notificationService.showQuestion('Confirm Delete ?').then(x => {
          if (x.isConfirmed) {
            this.onDelete();
          }
        })
      });
    this.maintenanceService.onSaveClick.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.form.valid) {
          this.form.disable();
          switch (this.maintenanceService.maintenenceMode.value) {
            case MaintenenceMode.Add:
              this.onAdd();
              break;
            case MaintenenceMode.Edit:
              this.onEdit();
              break;
            default:
              break;
          }
        }
      });

    this.maintenanceService.onCloseClick.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.disable();
        this.loadData(this.maintenanceService.page);
      });
  }

  ngAfterContentInit(): void {
    this.form.disable();
    this.maintenanceService.page = {
      pageIndex: 1,
      pageSize: 5
    };
    this.loadData(this.maintenanceService.page);
  }

  abstract onAddClick()

  abstract onEditClick()

  abstract baseUrl(mode)

  loadData(data) {
    console.log(data);
    const req: PageListingRequest = {
      pageNumber: data.pageIndex,
      pageSize: data.pageSize,
      search: this.maintenanceService.searchText
    }

    this.http.post<PagedListingResponse<T>>(this.baseUrl('getPaged'), req)
      .subscribe((x: PagedListingResponse<T>) => {
        this.dataSource.data = x.data;
        this.maintenanceService.dataSource.next(this.dataSource);
        this.maintenanceService.totalRow.next(x.totalRecords);
      })
  }

  onAdd() {
    const req: T = {
      ...this.form.getRawValue(),
      id: 0
    };
    this.http.post(this.baseUrl('onAdd'), req).subscribe((x: any) => {
      this.notificationService.showInfo(x.message);
      this.loadData(this.maintenanceService.page);
    });
  }

  onEdit() {
    const req: T = {
      ...this.form.getRawValue()
    };
    this.http.post(this.baseUrl('onEdit'), req).subscribe((x: any) => {
      this.notificationService.showInfo(x.message);
      this.loadData(this.maintenanceService.page);
    });
  }

  onDelete() {
    const req: T = {
      ...this.form.getRawValue()
    };
    this.http.post(this.baseUrl('onDelete'), req).subscribe((x: any) => {
      this.notificationService.showInfo(x.message);
      this.loadData(this.maintenanceService.page);
    });
  }

  selectionChanged(row: any) {
    console.log(row);
    this.form.patchValue({ ...row });
  }

  ngOnDestroy(): void {
    this.maintenanceService.AddBtnDisable.next(false);
    this.maintenanceService.EditBtnDisable.next(false);
    this.maintenanceService.DeleteBtnDisable.next(false);
    super.destroySubs();
  }
}

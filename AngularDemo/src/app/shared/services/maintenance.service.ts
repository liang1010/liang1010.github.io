import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { MaintenenceMode } from '../models/enum';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {

  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  columns: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  totalRow: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  searchText: string = '';
  onAddClick: Subject<void> = new Subject<void>();
  onEditClick: Subject<void> = new Subject<void>();
  onDeleteClick: Subject<void> = new Subject<void>();
  onSaveClick: Subject<void> = new Subject<void>();
  onCloseClick: Subject<void> = new Subject<void>();
  page: any = {};
  maintenenceMode: BehaviorSubject<MaintenenceMode> = new BehaviorSubject<MaintenenceMode>(MaintenenceMode.View);

  AddBtnDisable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  EditBtnDisable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  DeleteBtnDisable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

}

import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from 'src/app/shared/services/maintenance.service';
import { faAdd, faClose, faEdit, faRemove, faSave, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { SubscriptionBase } from 'src/app/shared/components/subscription-base';
import { pairwise, takeUntil } from 'rxjs';
import { MaintenenceMode } from 'src/app/shared/models/enum';


@Component({
  selector: 'maintenance-grid',
  templateUrl: './maintenance-grid.component.html',
  styleUrls: ['./maintenance-grid.component.css']
})
export class MaintenanceGridComponent extends SubscriptionBase implements OnInit {
  displayedColumns: string[] = [];
  columns: any[] = [];
  // @Input() columns: any[] = [];
  dataSource = new MatTableDataSource<any>();
  // @Input() dataSource = new MatTableDataSource<any>();
  totalRow: number = 0;
  // @Input() totalRow: number = 0;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() loadData: EventEmitter<any> = new EventEmitter();
  searchTextBoxValue
  faCoffee = faSearch
  faAdd = faAdd
  faEdit = faEdit
  faRemove = faTrash
  faSave = faSave
  faClose = faClose
  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private renderer: Renderer2,
    private maintenanceService: MaintenanceService) {
    super();
  }

  ngOnInit() {
    this.maintenanceService.dataSource.pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.dataSource = x;
      this.clicked(this.dataSource.data[0]);
      console.log(this.paginator)
      console.log(this.dataSource)
    })
    this.maintenanceService.columns.pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.columns = x;
    })
    this.maintenanceService.totalRow.pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (this.totalRow != x && this.paginator && this.maintenanceService.maintenenceMode.value == MaintenenceMode.View) {
        this.paginator.firstPage();
        this.paginator.length = x;
      } else {
        this.maintenanceService.maintenenceMode.next(MaintenenceMode.View);
      }
      this.totalRow = x;
    })
    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  selectedRow
  clicked(row) {
    this.selectionChanged.emit(row);
    this.selectedRow = row;
  }

  currentPage;
  getNext(page) {
    this.currentPage = page;
    console.log(page);
    page.pageIndex = page.pageIndex + 1
    this.maintenanceService.page = page;
    this.loadData.emit(page);
  }

  onSearchClick() {
    this.maintenanceService.searchText = this.searchTextBoxValue;
    this.getNext({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize });
  }
  AddBtn: boolean = this.maintenanceService.AddBtnDisable.value;
  EditBtn: boolean = this.maintenanceService.EditBtnDisable.value;
  DeleteBtn: boolean = this.maintenanceService.DeleteBtnDisable.value;
  SaveBtn: boolean = true;

  onAddClick() {
    this.AddBtn = true;
    this.EditBtn = true;
    this.DeleteBtn = true;
    this.SaveBtn = false;
    this.maintenanceService.onAddClick.next();
    this.maintenanceService.maintenenceMode.next(MaintenenceMode.Add);
  }

  onEditClick() {
    this.AddBtn = true;
    this.EditBtn = true;
    this.DeleteBtn = true;
    this.SaveBtn = false;
    this.maintenanceService.onEditClick.next();
    this.maintenanceService.maintenenceMode.next(MaintenenceMode.Edit);
  }

  onDeleteClick() {
    this.maintenanceService.onDeleteClick.next();
    this.maintenanceService.maintenenceMode.next(MaintenenceMode.Delete);
  }

  onSaveClick() {
    this.AddBtn = this.maintenanceService.AddBtnDisable.value;
    this.EditBtn = this.maintenanceService.EditBtnDisable.value;
    this.DeleteBtn = this.maintenanceService.DeleteBtnDisable.value;
    this.SaveBtn = true;
    this.maintenanceService.onSaveClick.next();
  }

  onCloseClick() {
    this.AddBtn = this.maintenanceService.AddBtnDisable.value;
    this.EditBtn = this.maintenanceService.EditBtnDisable.value;
    this.DeleteBtn = this.maintenanceService.DeleteBtnDisable.value;
    this.SaveBtn = true;
    this.maintenanceService.onCloseClick.next();
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

  setDisplayedColumns() {
    this.columns.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  onResizeColumn(event: any, index: number) {
    console.log(event.target.parentElement);
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.parentElement.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.columns.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }
  private getCellData(index: number) {
    const headerRow =
      this.matTableRef.nativeElement.children[0].querySelector('tr');
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX
            : -event.pageX + this.startX;
          const width = this.startWidth + dx;
          if (this.currentResizeIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      }
    );
    this.resizableMouseup = this.renderer.listen(
      'document',
      'mouseup',
      (event) => {
        if (this.pressed) {
          this.pressed = false;
          this.currentResizeIndex = -1;
          this.resizableMousemove();
          this.resizableMouseup();
        }
      }
    );
  }
  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if (newWidth > 50) {
        this.columns[index].width = width;
        this.setColumnWidth(this.columns[index]);
        this.columns[j].width = newWidth;
        this.setColumnWidth(this.columns[j]);
      }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(
      document.getElementsByClassName('mat-column-' + column.field)
    );
    columnEls.forEach((el: any) => {
      el.style.width = column.width + 'px';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

}

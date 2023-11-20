import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BackgroundProgressMiddlewareService } from './background-progress-middleware.service';
import { BackgroundProgressComponent } from '../components/background-progress/background-progress.component';
import { IBackgroundProgress, IBackgroundProgressMiddlewareMessage } from '../models/background-progress';

@Injectable()
export class BackgroundProgressService {
  dialogRef: MatDialogRef<BackgroundProgressComponent>;
  dialogRefStack = {}

  constructor(
    private dialog: MatDialog,
    private backgroundProgressMiddlewareService: BackgroundProgressMiddlewareService
  ) {
    this.behaviors();
  }

  private behaviors(): void {
    this.backgroundProgressMiddlewareService.getCancelBehavior()
      .pipe(
        tap((data: IBackgroundProgressMiddlewareMessage) => {
          if (data.isCancel) {
            this.endProgress(data.key);
          }
        })
      )
      .subscribe();
  }

  public showProgress(data: IBackgroundProgress, key: string = '') {
    if (!key) {
      if (!this.dialogRef) {
        this.dialogRef = this.dialog.open(BackgroundProgressComponent, {
          data,
          disableClose: true
        });

        this.dialogRef.afterClosed()
          .subscribe(closure => {
            this.dialogRef = undefined;
          });
      }

      return;
    }

    if (!this.dialogRefStack[key]) {
      data.key = key;
      this.dialogRefStack[key] = this.dialog.open(BackgroundProgressComponent, {
        data,
        disableClose: true
      });

      this.dialogRefStack[key].afterClosed()
        .subscribe(closure => {
          this.dialogRefStack[key] = undefined;
        });
    }
  }

  public endProgress(key: string = '') {
    if (!key) {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    } else {
      if (this.dialogRefStack[key])
        this.dialogRefStack[key].close();
    }
  }

  public getCancelStatus(): Subject<IBackgroundProgressMiddlewareMessage> {
    return this.backgroundProgressMiddlewareService.getCancelBehavior();
  }
}

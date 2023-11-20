import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { IBackgroundProgress } from '../../models/background-progress';
import { BackgroundProgressMiddlewareService } from '../../services/background-progress-middleware.service';

@Component({
  selector: 'cs-background-progress',
  templateUrl: './background-progress.component.html',
  styleUrls: ['./background-progress.component.css']
})
export class BackgroundProgressComponent implements OnInit {
  public title: string;
  public message: string;
  public spinner: boolean = false;
  public timeout: number;
  public dispCancel = false;

  private interval = 1000;

  constructor(
    private dialogRef: MatDialogRef<BackgroundProgressComponent>,
    private backgroundProgressMiddlewareService: BackgroundProgressMiddlewareService,
    @Inject(MAT_DIALOG_DATA) public data: IBackgroundProgress
  ) {
    this.message = data.message??' ';
    this.title = data.title?? ' Loading..... ';
    this.spinner = data.spinner;
    this.timeout = data.timeout;
  }

  ngOnInit() {
    this.init();
  }

  private init(): void {
    if (!!this.timeout) {
      this.data.timeout++;
      timer(0, this.interval)
        .pipe(
          take(this.data.timeout),
          tap(() => {
            this.data.timeout--;
            if (this.data.timeout === 0) {
              this.dispCancel = true;
            }
          })
        )
        .subscribe();
    }
  }

  public cancelProgress(): void {
    this.backgroundProgressMiddlewareService.setCancelBehavior(true, this.data.key);
  }
}

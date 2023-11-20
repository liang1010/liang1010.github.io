import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBackgroundProgressMiddlewareMessage } from '../models/background-progress';

@Injectable()
export class BackgroundProgressMiddlewareService {
  private progressCancelled: Subject<IBackgroundProgressMiddlewareMessage>;

  constructor() {
    this.progressCancelled = new Subject();
  }

  public getCancelBehavior(): Subject<IBackgroundProgressMiddlewareMessage> {
    return this.progressCancelled;
  }

  public setCancelBehavior(isCancel: boolean, key: string = ''): boolean {
    if (!this.progressCancelled) {
      return false;
    }

    this.progressCancelled.next({ isCancel: isCancel, key: key });
    return true;
  }
}

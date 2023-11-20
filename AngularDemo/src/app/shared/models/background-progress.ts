export interface IBackgroundProgress {
  key?: string;
  title?: string;
  message?: string;
  timeout?: number;
  spinner?: boolean;
}

export interface IBackgroundProgressMiddlewareMessage {
  isCancel?: boolean;
  key?: string;
}

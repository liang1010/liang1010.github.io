import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner, MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { BackgroundProgressComponent } from './components/background-progress/background-progress.component';
import { BackgroundProgressService } from './services/background-progress.service';
import { BackgroundProgressMiddlewareService } from './services/background-progress-middleware.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    BackgroundProgressComponent,
    // NavbarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // MatProgressSpinnerModule,
    // ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    // OverlayModule
  ],
  providers: [
    BackgroundProgressService,
    BackgroundProgressMiddlewareService,

  ],
  entryComponents: [
    // MatProgressSpinner
  ],
  exports: [
    // MatDialogModule,
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // ReactiveFormsModule,
    // MatProgressSpinnerModule,
    // OverlayModule,
    // NavbarComponent
  ]
})
export class SharedModule { }

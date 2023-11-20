import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() { }

  showError(errorMessage: string): void {
    Swal.fire('Ops, something went wrong', errorMessage, 'error');
  }

  showSuccess(errorMessage: string): void {
    // Swal.fire('Success', errorMessage, 'success',);
    Swal.fire({
      title: 'Success title',
      icon: 'success',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showInfo(errorMessage: string): void {
    Swal.fire('Information', errorMessage, 'info');
  }

  showQuestion(errorMessage: string) {
    return Swal.fire({
      title: 'Question',
      icon: 'question',
      html: errorMessage,
      showConfirmButton: true,
    });
  }

  showWarning(errorMessage: string): void {
    Swal.fire('Warning', errorMessage, 'warning');
  }
}

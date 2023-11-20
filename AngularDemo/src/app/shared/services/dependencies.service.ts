import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DependenciesService {

  constructor(
    private router: Router,
  ) {
  }

  navigateByUrl(url: string) {
    // const uniqueKey = Guid.create().toString();
    // this.backgroundProgressService.showProgress({},uniqueKey);
    this.router.navigateByUrl(url, { skipLocationChange: true });
    // this.backgroundProgressService.endProgress(uniqueKey);
  }
}

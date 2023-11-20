import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NavigationItem } from '../models/navigation-item.model';
import { Guid } from 'guid-typescript';
import { DependenciesService } from './dependencies.service';
import { Util } from './util';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private dependenciesService: DependenciesService,
    private http: HttpClient,
  ) { }
  getNavigation(): Observable<NavigationItem[]> {
    const uniqueKey = Guid.create().toString();
    this.dependenciesService.backgroundProgressService.showProgress({}, uniqueKey);
    // const url = Util.joinUrl(
    //   [
    //     this.dependenciesService.configValue.apiUrl,
    //     this.dependenciesService.configValue.auth.api,
    //     this.dependenciesService.configValue.auth.login
    //   ]
    // );
    const url = Util.joinUrl(
      [
        this.dependenciesService.configValue.apiUrl,
        'Navigation',
        'getNavigation'
      ]
    );
    return this.http.post<NavigationItem[]>(url, {}).pipe(tap((_loginResponse) => {
      this.dependenciesService.backgroundProgressService.endProgress(uniqueKey);
    }));

  }
}

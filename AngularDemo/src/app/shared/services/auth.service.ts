import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DependenciesService } from './dependencies.service';
import { Util } from './util';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LoginResponseModel } from '../models/login.response.model';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { NavigationItem } from '../models/navigation-item.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  refreshTokenInterval
  public loginResponse: BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>({});
  get token() { return this.loginResponse?.value?.token };
  menuData: BehaviorSubject<NavigationItem[]> = new BehaviorSubject<NavigationItem[]>([]);

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private dependenciesService: DependenciesService,
    private notificationService: NotificationService
  ) {
  }

  login(username: string, password: string): Observable<LoginResponseModel> {
    const url = Util.joinUrl(
      [
        this.configService.configValue.apiUrl,
        this.configService.configValue.auth.api,
        this.configService.configValue.auth.login
      ]
    );
    return this.http.post<LoginResponseModel>(url, { username, password }).pipe(tap(_loginResponse => {
      this.loginResponse.next(_loginResponse);
      this.getNavigation();
      this.refreshTokenInterval = setInterval(() => this.checkRefreshToken(), 30000);
      this.notificationService.showSuccess("Welcome");
      this.dependenciesService.navigateByUrl('admin/dashboard');
    },
    ));
  }

  checkRefreshToken() {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const singaporeDate = new Date(new Date(this.loginResponse.value.expiration.toLocaleString('en-US', { timeZone: userTimeZone })).getTime() - 5 * 60 * 1000);
    const currentDateMin5mins = new Date();
    if (singaporeDate < currentDateMin5mins) {
      clearInterval(this.refreshTokenInterval);
      this.refreshToken();
    }
  }

  refreshToken() {
    const url = Util.joinUrl(
      [
        this.configService.configValue.apiUrl,
        this.configService.configValue.auth.api,
        this.configService.configValue.auth.refreshToken
      ]
    );
    this.http.post<LoginResponseModel>(url,
      {
        accessToken: this.loginResponse.value.token,
        refreshToken: this.loginResponse.value.refreshToken
      })
      .subscribe(_loginResponse => {
        this.loginResponse.next(_loginResponse);
        this.refreshTokenInterval = setInterval(() => this.checkRefreshToken(), 30000);
      });
  }

  getNavigation() {
    // const url = Util.joinUrl(
    //   [
    //     this.dependenciesService.configValue.apiUrl,
    //     this.dependenciesService.configValue.auth.api,
    //     this.dependenciesService.configValue.auth.login
    //   ]
    // );
    const url = Util.joinUrl(
      [
        this.configService.configValue.apiUrl,
        'Navigation',
        'getNavigation'
      ]
    );
    this.http.post<NavigationItem[]>(url, {}).subscribe(x => {
      this.menuData.next(x);
    })
    // .pipe(tap((_loginResponse) => {
    //   this.dependenciesService.backgroundProgressService.endProgress(uniqueKey);
    // }));

  }
}

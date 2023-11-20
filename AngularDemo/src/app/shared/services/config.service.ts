import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigModel } from '../models/config.model';
import { Util } from './util';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public config: BehaviorSubject<ConfigModel>;

  get configValue() { return this.config.value }
  constructor() {
    this.config = new BehaviorSubject<ConfigModel>({} as ConfigModel);
  }

  public async load(client: HttpClient): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      const config$: Observable<Object> = client.get('assets/config/config.json', { headers: headers });

      combineLatest([
        config$
      ])
        .subscribe({
          next: ([config]: [ConfigModel]) => {
            const data: ConfigModel = {
              ...config,
            };
            if (!data) {
              reject('Error happened in loading configs');
            }
            this.config.next(data);
            resolve(true);
            this.logIP(client, data);
          }, error: (error: any) => reject(`${'Error happened in loading configs'}: ${error}`)
        });
    }).catch((err) => console.error(`${'Error happened in loading configs'}: ${err}`));
  }

  logIP(client: HttpClient, data: any) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`Client's Time Zone: ${userTimeZone}`);
    const url = Util.joinUrl([data.apiUrl, data.logger.api, data.logger.log]);
    client.get<any>('http://geolocation-db.com/json/').subscribe(ip => {
      client.post(url, { message: `Web ui launch. Client's Time Zone: ${userTimeZone}. IP : ${ip.IPv4} ${ip.country_name} ${ip.state} ${ip.city} ${ip.postal}` }).subscribe();
    }, (error: any) => {
      client.post(url, { message: `Web ui launch. Client's Time Zone: ${userTimeZone}. IP : ${JSON.stringify(error)}` }).subscribe();
    });
  }
}


import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicLayoutModule } from './layout/public-layout/public-layout.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicLayoutModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: AppModule.configProviderFactory,
    deps: [ConfigService, HttpClient],
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static configProviderFactory<T>(provider: ConfigService, client: HttpClient) {
    const f = () => provider.load(client);
    return f;
  }
}

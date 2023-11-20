import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';
import { DependenciesService } from 'src/app/shared/services/dependencies.service';

@Component({
  selector: 'public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {

  header;
  constructor(
    private dependenciesService: DependenciesService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.header = this.configService.configValue.header;
  }
  onClick() {
    this.dependenciesService.navigateByUrl('login');
  }
}

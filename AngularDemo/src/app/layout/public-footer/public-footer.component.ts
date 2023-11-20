import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.css']
})
export class PublicFooterComponent implements OnInit {
  footer;
  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.footer = this.configService.configValue.footer;
  }

}

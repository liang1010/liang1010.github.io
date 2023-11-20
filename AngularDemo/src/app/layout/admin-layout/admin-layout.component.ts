import { Component, OnInit } from '@angular/core';
import { DependenciesService } from 'src/app/shared/services/dependencies.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private dependenciesService:DependenciesService
  ) { }

  ngOnInit(): void {
  }

}

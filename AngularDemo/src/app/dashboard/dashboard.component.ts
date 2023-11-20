import { Component, OnInit } from '@angular/core';
import { DependenciesService } from '../shared/services/dependencies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dependenciesService:DependenciesService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.dependenciesService.navigateByUrl('');
  }
}

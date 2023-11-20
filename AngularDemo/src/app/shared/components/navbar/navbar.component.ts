import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { NavigationItem } from '../../models/navigation-item.model';
import { DependenciesService } from '../../services/dependencies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  menuData: BehaviorSubject<NavigationItem[]> = new BehaviorSubject<NavigationItem[]>([]);
  constructor(
    private dependenciesService: DependenciesService,

    private authService: AuthService) {
  }
  ngOnInit(): void {
    this.menuData = this.authService.menuData;
  }
  selectedMenu
  handleItemClick(menu: NavigationItem) {
    // Handle the click event here, you can add your logic
    console.log('Clicked on:', menu);
    if (menu.url) {
      this.dependenciesService.navigateByUrl(menu.url);
    }
    this.selectedMenu = menu.name
    // this.dependenciesService.navigateByUrl('admin/maintenance/system-variable');
    // You can call functions or perform other actions based on the clicked menu item
  }
}

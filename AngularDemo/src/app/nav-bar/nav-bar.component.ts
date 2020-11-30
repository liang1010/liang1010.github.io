import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Navbar } from '../interface/nav-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  navbars: Navbar[];
  isNavbarLoaded: boolean = false;

  @ViewChild('navbarToggler') navbarToggler: ElementRef;


  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.loadNavbar();
  }

  loadNavbar() {
    this.getNavbar().subscribe((response: Navbar[]) => {
      console.log(response);
      this.navbars = response;
    });

  }

  getNavbar(): Observable<Navbar[]> {
    return this.http.get<Navbar[]>('assets/navbar.json');
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }
}
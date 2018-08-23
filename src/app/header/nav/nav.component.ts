import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed: boolean;
  constructor() {
    this.isCollapsed = true;
  }

  menuItems: {
    name: string,
    url: string,
    set: boolean
  }[] = [{
    name: 'Home',
    url: '/home',
    set: true
  }, {
    name: 'About',
    url: '/',
    set: false,
  }, {
    name: 'Contact Us',
    url: '/',
    set: false
  }];

  ngOnInit() {
  }

  selectMenu(index: number) {

  }

}

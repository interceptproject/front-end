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
    url: '/',
    set: true
  }, {
    name: 'About',
    url: 'https://interceptproject.org/?page_id=18',
    set: true,
  }, {
    name: 'Contact Us',
    url: 'https://interceptproject.org/?page_id=19',
    set: true
  }];

  ngOnInit() {
  }

  selectMenu(index: number) {

  }

}

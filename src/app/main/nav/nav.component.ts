import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuItems: {
    name: string,
    url: string,
    set: boolean
  }[] = [{
    name: 'Home',
    url: '/survey',
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

  constructor() { }

  ngOnInit() {
  }

}

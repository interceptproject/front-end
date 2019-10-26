import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuItems: {
    name: string
    set: boolean
  }[] = [{
    name: 'Home',
    set: true
  }, {
    name: 'NGO Registration',
    set: false
  }, {
    name: 'Volunteer',
    set: false
  }, {
    name: 'About',
    set: false,
  }, {
    name: 'Contact Us',
    set: false
  }];

  constructor() { }

  ngOnInit() {
  }

}

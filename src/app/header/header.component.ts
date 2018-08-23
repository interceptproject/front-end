import { Component, OnInit } from '@angular/core';

export interface LanguageOption {
  name: string,
  title: string,
  set: boolean
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}

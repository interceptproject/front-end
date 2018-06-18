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
  languageOptions: LanguageOption[] = [{
    name: 'Japanese', title: '日本語', set: false
  }, {
    name: 'Chinese', title: '中文', set: false
  }, {
    name: 'English', title: 'English', set: true
  }, {
    name: 'Spanish', title: 'Español', set: false
  }, {
    name: 'French', title: 'French', set: false
  }];

  constructor() { }

  ngOnInit() {
    console.log('HeaderComponent');
    console.log(this.languageOptions);
  }

  // different language, use router link? ex: /en, '/jpn'
  setLanguage(index: number) {
    console.log(this.languageOptions[index]);
    for (let i = 0; i < this.languageOptions.length; i++) {
      index == i ? this.languageOptions[index].set = true : this.languageOptions[index].set = false;
    }
  }

}

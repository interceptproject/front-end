import { Component, OnInit } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  noticeDisplay: number = 1;
  progress: number = 0;
  currentQ: number = 1;
  questions: any[] = ['test', 'test'];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SurveyService } from './../../services/survey.service';

//TODO:: make it to Model later
//Question model needs to have service ID - 'category'(string) is not enough
export interface Question {
  category: string,
  core: boolean,
  questionText: string,
  helpText: string,
  questionID: number,
  answerOptions: {
    type: string,
    selection: {
      id: number,
      text: string,
      tags: number[]
    }[]
  }
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  initialDisplay: number;
  questions: any[];

  constructor(
    private router: Router,
    private surveySvc: SurveyService
  ) { }

  ngOnInit() {
    
    //Load up initial display first
    this.setInitialDisplay(1);

  }

  setInitialDisplay(number: number) {
    this.initialDisplay = number;
  }

  loadQuestions() {
    this.questions = this.surveySvc.getQuestions();
  }

  receieveAnswers(data: any) {
    console.log(data);
    if (data.answers.length == 0) {
      this.questions = [];
      return this.setInitialDisplay(1);
    }
    //get search result
    console.log('go to org list');
    this.submitSurvey(data);
  }

  startSurvey() {
    this.loadQuestions();
    this.setInitialDisplay(0);
  }

  submitSurvey(data: any) {
    //make query params based on data
    this.router.navigate(['/organizations'], {
      queryParams: {
        save: data.save,
        service: null
      }
    });
  }

}

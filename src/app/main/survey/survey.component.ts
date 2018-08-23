import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SurveyService } from './../../core/services/survey.service';
import { AjaxService } from './../../core/services/ajax.service';

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
  //For allowing clicking on home in survey component to reset survey component
  navigationSubscription;

  //Variable keeping track of whether user has read over disclaimer and is ready to proceed
  userReady = false;

  initialDisplay: number;
  questions: any[];

  constructor(
    private router: Router,
    private surveySvc: SurveyService,
    private ajaxService : AjaxService,

  ) { }

  ngOnInit() {

    //Loads questions
    this.loadQuestions();
  }

  loadQuestions() {
    //TODO: Implement error handling

    this.ajaxService.getQuestions()
    .subscribe(
      (response) => {
          this.questions = response;
          console.log(response);
      },
      (error) => console.log(error)
    );
  }

  receiveAnswers(data: any) {
    console.log(data);
    if (data.answers.length == 0) {
      this.questions = [];
    }
    //get search result
    console.log('go to org list');
    this.submitSurvey(data);
  }

  startSurvey() {
    this.userReady = true;
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

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SurveyService } from './../../core/services/survey.service';
import { AjaxService } from './../../core/services/ajax.service';
import { DataService } from './../../core/services/data.service';
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
  specializations: any[];
  services: any[];
  targets: any[];
  requirements: any[];
  startTime: any;

  constructor(
    private router: Router,
    private surveySvc: SurveyService,
    private ajaxService : AjaxService,
    private dataService : DataService

  ) { }

  // First things that happens
  ngOnInit() {
    //Loads questions
    this.loadQuestions();
    this.startTime = +new Date();
  }

  loadQuestions() {
    //TODO: Implement error handling

    // this.ajaxService.getQuestions()
    // .subscribe(
    //   (response) => {
    //       this.questions = response;
    //       console.log(response);
    //   },
    //   (error) => console.log(error)
    // );
    this.ajaxService.getQuestion(1)
    .subscribe(
      (response) => {
          this.questions = response;
          console.log(response);
      },
      (error) => console.log(error)
    );
  }

  receiveAnswers(data: any) {

    // if (data.answers.length == 0) {
    //   this.questions = [];
    // }
    // Add in the total competion time for the survey
    let endTime = +new Date();
    let totalTime = endTime - this.startTime;
    data.totalTime = totalTime;
    let date = new Date();
    data.timeSent = date.toUTCString();
    
    //submit survey to backend
    this.submitSurvey(data);
  }

  startSurvey() {
    this.userReady = true;
  }

  submitSurvey(data: any) {
    this.ajaxService.submitSurvey(data)
      .subscribe(
        (data) => this.dataService.updateList(data),
        (err) => console.log(err)
      );
    
    this.router.navigate(['/organizations'], {
      queryParams: {
        save: data.save,
        service: null
      }
    });
  }

}

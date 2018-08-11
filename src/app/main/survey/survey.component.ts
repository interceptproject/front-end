import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SurveyService } from './../../services/survey.service';
import { AjaxService } from './../../services/ajax.service';

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

  initialDisplay: number;
  questions: any[];

  constructor(
    private router: Router,
    private surveySvc: SurveyService,
    private ajaxService : AjaxService,

  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.reinitialize();
      }
    });
   }

  ngOnInit() {
    
    //Load up initial display first
    this.setInitialDisplay(1);
    this.loadQuestions();
  }

  //Used to reinitialize component. Home button in nav redirects to /survey, and allows for clicking home in
  // the /survey component to 'refresh' the component
  reinitialize() {
    this.setInitialDisplay(1);
  }

  setInitialDisplay(number: number) {
    this.initialDisplay = number;
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
      return this.setInitialDisplay(1);
    }
    //get search result
    console.log('go to org list');
    this.submitSurvey(data);
  }

  startSurvey() {
    // this.loadQuestions();
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

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our reinitialize()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}

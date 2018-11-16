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

  constructor(
    private router: Router,
    private surveySvc: SurveyService,
    private ajaxService : AjaxService,
    private dataService : DataService

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
    this.submitSurvey(this.processAnswers(data.answers));
  }

  processAnswers(answers: any[]) {
    let location = "";
    let specializations = [];
    let services = [];
    let targets = [];
    let requirements = [];
    const props = ['specializations', 'services', 'targets', 'requirements'];
    for (let i = 0; i < answers.length; i++) {
      // console.log(answers[i]);
      for (let j = 0; j < answers[i].length; j++) {
        if (typeof answers[i][j] == 'string') {
          location = answers[i][j];
        } else {
          // console.log(answers[i][j]);
          if (answers[i][j].specializations.length > 0) {
            specializations.push(...answers[i][j].specializations);
          }
          if (answers[i][j].services.length > 0) {

            services.push(...answers[i][j].services);
          }
          if (answers[i][j].targets.length > 0) {
            targets.push(...answers[i][j].targets);
          }
          if (answers[i][j].requirements.length > 0) {
            requirements.push(...answers[i][j].requirements);
          }
        }
      }
    }
    return {
      location: location,
      specializations: specializations,
      services: services,
      targets: targets,
      requirements: requirements
    };
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

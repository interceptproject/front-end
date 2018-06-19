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

export interface Service {
  id: number,
  name: string,
  selected: boolean
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  initialDisplay: number = 1;
  services: Service[];
  questions: Question[];

  constructor(
    private router: Router,
    private surveySvc: SurveyService
  ) { }

  ngOnInit() {
    this.loadServices();
    // this.startSurvey();
  }

  loadServices() {
    let arr = [];
    const services = this.surveySvc.getServices();
    for (let i = 0; i < services.length; i++) {
      arr.push({
        id: services[i].id,
        name: services[i].name,
        selected: false
      });
    }
    arr.push({
      id: null,
      name: 'Other/Not sure',
      selected: false
    })
    this.services = arr;
  }

  loadQuestions() {
    this.questions = this.surveySvc.getQuestions();
  }

  selectService(index: number) {
    this.unselectSelected(index);
    this.services[index].selected = !this.services[index].selected;
  }

  unselectSelected(index: number) {
    if (index !== this.services.length - 1) {
      return this.services[this.services.length - 1].selected = false;
    }
    this.services = this.services.map(service => {
      service.selected = false;
      return service;
    });
  }

  receieveAnswers(data: any) {
    console.log(data);
    if (data.answers.length == 0) {
      this.questions = [];
      return this.initialDisplay = 3;
    }
    //get search result
    console.log('go to org list');
    this.submitSurvey(data);
  }

  startSurvey() {
    const selected = this.services.filter(service => service.selected);
    console.log(selected);
    let q = this.surveySvc.getQuestions();
    for (let i = 0; i < q.length; i++) {
      // remove service question that has been satisfied by 'I need' question
    }
    this.questions = q;
    this.initialDisplay = 0;
  }

  submitSurvey(data: any) {
    //make query params based on data
    const ids = this.getSelectedServiceIDs();
    console.log(ids);
    this.router.navigate(['/organizations'], {
      queryParams: {
        save: data.save,
        service: this.getSelectedServiceIDs().join()
      }
    });
  }

  getSelectedServiceIDs() {
    console.log(this.services);
    let arr = [];
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].selected) {
        arr.push(this.services[i].id);
      }
    }
    return arr;
  }

  getSelectedAnswerTags(answers: any[]) {

  }
}

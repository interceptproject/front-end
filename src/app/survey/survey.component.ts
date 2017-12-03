import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AjaxService } from './../services/ajax.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  openSurveyFlag: boolean = false;
  questions: any[];
  currentQuestion;
  constructor(
    private ajxSvc: AjaxService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.initializeSurveyData();
  }
  initializeSurveyData() {
    this.ajxSvc.getQuestions().subscribe(
      (data) => {
        //console.log(data);
        this.questions = data;
        //console.log(this.questions);
        this.currentQuestion = this.questions[0];
        console.log("TIHS IS CUURENT Q: ", this.currentQuestion);
      }, (err) => console.log(err)
    );
  }
  private processQuestions(data) {
    console.log("Ich bin in processQuestions")
    let processed = [];
    for (let i = 0; i < data.length; i++) {
      let q = {id: null, question: null}
      for (var prop in data[i]) {
        if (prop == '_id') {
          q.id = data[i][prop];
        } else {
          q.question = data[i][prop];
        }
      }
      processed.push(q);
    }
    console.log(processed);
    return processed;
  }

  open() {
    console.log('survey working');
    this.openSurveyFlag = true;
    console.log(this.openSurveyFlag);
  }
}
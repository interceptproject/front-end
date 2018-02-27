import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AjaxService } from './../../services/ajax.service';

export interface Question {
  questionID: number,
  questionText: string,
  questionType: string,
  answerPossibilities: Answer[]
}

export interface Answer {
  text: string,
  tags: any[],
  nextQID: number
}

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  @Input() questions: Question[];
  question: Question;
  currentIndex: number;
  answers: Answer[] = [];
  answer: Answer;

  isEmergency: boolean = false;
  isSubmitReady: boolean = false;

  address = {
    street: "",
    city: "",
    state: "",
    zipcode: ""
  };
  tags = [];

  constructor(private ajxSvc: AjaxService) { }

  ngOnInit() {
    console.log('SurveyFormComponent');
    console.log(this.questions);
    // this.initializeSurveyData();
    this.loadQuestion(101);
  }

  // initializeSurveyData() {
  //   this.ajxSvc.getQuestions().subscribe(
  //     (data) => {
  //       this.questions = data;
  //       console.log(this.questions);
  //       this.loadQuestion(101);
  //     }, (err) => console.log(err)
  //   );
  // }


  loadQuestion(qID: number) {
    this.checkEmergency(qID);

    if (!this.isEmergency) {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].questionID == qID) {
          this.question = this.questions[i];
          this.currentIndex = i;
          console.log(this.question);
          console.log('currentIndex: ', this.currentIndex);
          // this.selectTemplate(this.question.questionType);
        }
      }
    }
  }

  checkEmergency(qID: number) {
    this.isEmergency = qID == 911 ? true : false;
  }

  selectOption(index) {
    this.answer = this.question.answerPossibilities[index];
    console.log(this.answer);
    this.checkIfSubmitReady(this.answer.nextQID);
  }

  checkIfSubmitReady(nextQID: number) {
    this.isSubmitReady = nextQID == 0 ? true : false;
  }

  prev() {
    console.log('previous!');
    this.currentIndex--;
    this.question = this.questions[this.currentIndex];
    this.answer = null;
  }

  next() {
    console.log(this.answer);
    if (this.question.questionType == 'text') {
      return this.recordUserAddress();
    }
    console.log('h');
    this.recordAnswer(this.answer);
    this.loadQuestion(this.answer.nextQID);
    this.answer = null;
  }

  skip() {
    let nextQuestion = this.questions[this.currentIndex + 1];
    console.log('nextquestion is: ' + nextQuestion.questionID);
    this.loadQuestion(nextQuestion.questionID);
  }

  recordAnswer(answer: Answer) {
    this.answers.push(answer);
  }

  recordUserAddress() {
    console.log(this.address);
    let message = '';
    if (this.address.city == '' || this.address.state == '') {
      if (this.address.city == '') {
        message += 'Please enter city.\n';
      }
      if (this.address.state == '') {
        message += 'Please enter state.';
      }
      return alert(message);
    }
    this.answers.push(null);
    this.loadQuestion(this.question.answerPossibilities[0].nextQID);
  }

  submit() {
    let survey = {
      location: this.address.street + "," + this.address.city + "," + this.address.state + "," + this.address.zipcode,
      services: this.tags,
      populations: this.tags
    };
    console.log(survey);
    this.ajxSvc.surveyData = survey;
//     this.ajxSvc.submitSurvey(survey).subscribe(
//       (data) => {
//           this.ajxSvc.rev_orgs = data;
//           console.log(this.ajxSvc.rev_orgs);
//           console.log(data);
//                 },
//       (err) => console.log("Wir haben error"),
//         () => console.log("things have run")
//     );
//    this.ajxSvc.submitSurvey(survey);
  }

}

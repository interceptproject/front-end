import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';

export interface Selection {
  text: string,
  targets: number[],
  services: number[],
  specializations: number[],
  requirements: number[]
}

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss']
})
export class QuestionBoxComponent implements OnInit {
  @Input() questions: any[];
  current: {
    index: number,
    question: any
  } = {
    index: 0,
    question: null
  };
  isAnswered: boolean = false;
  radioOptions: {
    selected: boolean,
    option: Selection[]
  }[] = [];
  textInput: string;
  textInputInvalid: boolean = false;
  dropDownOptions: {
    selected: boolean,
    option: any
  }[] = [];
  surveyComplete: boolean = false;
  answers: any[][] = []; // use index against questions array to find matching questionID
  @Output() sendAnswers = new EventEmitter<{
    save: boolean,
    answers: any[]
  }>();

  constructor() { }

  ngOnInit() {
    console.log(this.questions);
    this.loadQuestion(0);
  }

  loadQuestion(index: number) {
    this.current = {
      index: index,
      question : this.questions[index]
    };
    console.log(this.current);
    if (this.current.question) {
      this.loadAnswerOptions(this.current.question.display);
    }

  }

  loadAnswerOptions(display: string) {
    console.log(display);
    if (display == 'radio') {
      this.radioOptions = this.current.question.answer_options.selection.map(option => {
        return {
          selected: false,
          option: option
        };
      })
    }
    if (display == 'drop-down') {
      this.dropDownOptions = [{
        selected: false,
        option: 'USA'
      }, {
        selected: false,
        option: 'Canada'
      }, {
        selected: false,
        option: 'Mexico'
      }];
    }
    if (display == 'location') {
      this.textInput = null;
      console.log(this.textInput);
    }
  }

  previous(currentIndex: number) {
    if (currentIndex == 0) {
      this.answers = [];
      return this.sendAnswers.emit({
        save: false,
        answers: this.answers
      });
    }
    this.setAnswer(null, currentIndex);
    this.go(false, currentIndex);
  }

  skip(currentIndex: number) {
    this.setAnswer(null, currentIndex);
    this.go(true, currentIndex);
  }

  clickRadioOption(index: number) {
    if (this.current.question.answer_options.type == 'single-selection') {
      for (let i = 0; i < this.radioOptions.length; i++) {
        this.radioOptions[i].selected = i == index ? !this.radioOptions[i].selected : false;
      }
    }
    if (this.current.question.answer_options.type == 'multi-selection') {
      this.radioOptions[index].selected = !this.radioOptions[index].selected;
    }
    console.log(this.radioOptions);
    this.checkIfAnswered('radio');
  }

  selectDropDownOption(index: number) {
    console.log(index);
    for (let i = 0; i < this.dropDownOptions.length; i++) {
      this.dropDownOptions[i].selected = i == index ? true : false;
    }
    this.checkIfAnswered('drop-down');
  }

  updatingTextInput(value) {
    console.log(value);
    this.textInputInvalid = false;
    this.textInput = null;
    if (this.current.question.display == 'location') {
      if (value !== 'Atlanta') {
        this.textInputInvalid = !this.validateZipcode(value);
      }
      if (!this.textInputInvalid) {
        this.textInput = value;
      }
      console.log(this.textInput);
    }
    this.checkIfAnswered(this.current.question.display);
  }

  validateZipcode(value: string) {
    const zipcode = new RegExp(/^\d{5}$/);
    return zipcode.test(value);
  }

  checkIfAnswered(display: string) {
    if (display == 'radio') {
      console.log('is radio option selected');
      console.log(this.radioOptions.filter(option => option.selected).length);
      return this.isAnswered = this.radioOptions.filter(option => option.selected).length ? true : false;
    }
    if (display == 'drop-down') {
      console.log(this.dropDownOptions.filter(option => option.selected).length);
      return this.isAnswered = this.dropDownOptions.filter(option => option.selected).length ? true : false;
    }
    if (display == 'location') {
      console.log('is locaiton answered');
      console.log(this.textInput);
      return this.isAnswered = this.textInput ? true : false;
    }
  }

  next(currentIndex: number) {
    if (this.current.question.display == 'radio') {
      this.setAnswer(this.extractSelectedOptions(this.radioOptions), currentIndex);
    }
    if (this.current.question.display == 'drop-down') {
      this.setAnswer(this.extractSelectedOptions(this.dropDownOptions), currentIndex);
    }
    if (this.current.question.display == 'location') {
      this.setAnswer([this.textInput], currentIndex);
    }
    this.go(true, currentIndex);
    console.log(this.answers);
  }

  extractSelectedOptions(options: any[]) {
    let arr = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        arr.push(options[i].option);
      }
    }
    return arr;
  }

  setAnswer(answer: any[], currentIndex: number) {
    this.answers[currentIndex] = answer;
  }

  go(forward: boolean, currentIndex: number) {
    forward ? currentIndex++ : currentIndex--;
    if (currentIndex >= this.questions.length) {
      return this.surveyComplete = true;
    }
    this.loadQuestion(currentIndex);
    this.checkIfAnswered(this.current.question.display);
  }

  submit(saveOption: boolean) {
    console.log(this.answers);
    this.sendAnswers.emit({
      save: saveOption,
      answers: this.answers
    });
  }

}

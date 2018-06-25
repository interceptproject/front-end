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
  dropDown: any;

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
    this.loadAnswerOptions(this.current.question.display);
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

  enteringZipcode(value) {
    console.log(value);
    this.textInput = value;
    console.log(this.textInput);
    this.checkIfAnswered(this.current.question.display);
  }

  checkIfAnswered(display: string) {
    if (display == 'radio') {
      console.log('is radio option selected');
      console.log(this.radioOptions.filter(option => option.selected).length);
      return this.isAnswered = this.radioOptions.filter(option => option.selected).length ? true : false;
    }
    if (display == 'drop-down') {

    }
    if (display == 'location') {
      console.log('is locaiton answered');
      console.log(this.textInput);
      return this.isAnswered = this.textInput ? true : false;
    }
  }

  next(currentIndex: number) {
    if (this.current.question.display == 'radio') {
      const selected = this.radioOptions.filter(option => option.selected);
      console.log(selected);
      this.setAnswer(selected, currentIndex);
    }
    if (this.current.question.display == 'drop-down') {
      // this.setAnswer([this.location], currentIndex);
    }
    if (this.current.question.display == 'location') {
      this.setAnswer([this.textInput], currentIndex);
    }
    this.go(true, currentIndex);
    console.log(this.answers);
  }

  setAnswer(answer: any[], currentIndex: number) {
    this.answers[currentIndex] = answer;
  }

  go(forward: boolean, currentIndex: number) {
    forward ? currentIndex++ : currentIndex--;
    this.loadQuestion(currentIndex);
    this.checkIfAnswered(this.current.question.display);
  }

  submit(currentIndex: number, saveOption: boolean) {
    // this.setAnswer(this.getSelected(currentIndex), currentIndex);
    console.log(this.current);
    console.log(this.answers);

    this.sendAnswers.emit({
      save: saveOption,
      answers: this.answers
    });
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';

export interface Question {
  category: string,
  core: boolean,
  questionText: string,
  helpText: string,
  questionID: number,
  answerOptions: {
    type: string,
    selection: AnswerOption[]
  }
}

export interface AnswerOption {
  id: number,
  selected: boolean,
  text: string,
  tags: number[]
}

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss']
})
export class QuestionBoxComponent implements OnInit {
  @Input() questions: Question[];
  current: {
    index: number,
    question: Question,
    answerOptions: AnswerOption[]
  } = {
    index: 0,
    question: null,
    answerOptions: null
  };
  answers: AnswerOption[] = []; // use index against questions array to find matching questionID
  @Output() sendAnswers = new EventEmitter<{
    save: boolean,
    answers: AnswerOption[]
  }>();
  
  constructor() { }

  ngOnInit() {
    console.log(this.questions);
    this.loadQuestion(0);
  }

  loadQuestion(index: number) {
    this.current.index = index;
    this.current.question = this.questions[index];
    this.current.answerOptions = this.current.question.answerOptions.selection;
    console.log(this.current);
  }

  setAnswerOptions(options) {

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

  selectOption(optionIndex: number) {
    for (let i = 0; i < this.current.answerOptions.length; i++) {
      this.current.answerOptions[i].selected = i == optionIndex ? true : false;
    }
  }

  checkAnswerSelected() {
    return this.current.answerOptions.filter(option => option.selected).length;
  }

  next(currentIndex: number) {
    this.setAnswer(this.getSelected(currentIndex), currentIndex);
    this.go(true, currentIndex);
  }

  getSelected(currentIndex: number) {
    for (let i = 0; i < this.current.answerOptions.length; i++) {
      if (this.current.answerOptions[i].selected) {
        return this.current.answerOptions[i];
      }
    }
  }

  setAnswer(selected: AnswerOption, currentIndex: number) {
    this.answers[currentIndex] = selected;
  }

  go(forward: boolean, currentIndex: number) {
    forward ? currentIndex++ : currentIndex--;
    this.loadQuestion(currentIndex);
  }

  submit(currentIndex: number, saveOption: boolean) {
    this.setAnswer(this.getSelected(currentIndex), currentIndex);
    this.sendAnswers.emit({
      save: saveOption,
      answers: this.answers
    });
  }

}

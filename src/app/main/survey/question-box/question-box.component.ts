import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Selection {
  targets: number[],
  services: number[],
  specializations: number[],
  requirements: number[]
}

export interface Data {
  qID: number,
  answers: [
    {
      answerID: number,
      text: string
    }
  ],
  clickedWhy: boolean,
  skipped: boolean
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
    question: any,
    qID: number,
    clickedWhy: boolean,
    skipped: boolean,
    startTime: any
  } = {
    index: 0,
    question: null,
    qID: null,
    clickedWhy: false,
    skipped: false,
    startTime: null
  };
  
  isAnswered: boolean = false;
  radioOptions: {
    selected: boolean,
    optionData: Selection[]
  }[] = [];
  textInput: string;
  textInputInvalid: boolean = false;
  dropDownOptions: {
    selected: boolean,
    option: any
  }[] = [];
  surveyComplete: boolean = false;

  // User demographics that get passed over
  location: string;
  specializations: number[] = [];
  services: number[] = [];
  targets: number[] = [];
  requirements: number[] = [];
  responseData: any[] = [];

  // MIGHT HAVE TO CHANGE BELOW SINCE CHANGING STRUCTURE OF THE ARRAY
  @Output() sendAnswers = new EventEmitter<{
    location: string,
    specializations: any[],
    services: any[],
    targets: any[],
    requirements: any[],
    responseData: any[],
  }>();

  constructor() { }

  ngOnInit() {
    this.loadQuestion(0);
  }

  // Load's the question corresponding to the index for display
  loadQuestion(index: number) {
    this.current = {
      index: index,
      question : this.questions[index],
      qID: index + 1,
      clickedWhy: false,
      skipped: false,
      startTime: +new Date()
    };
    if (this.current.question) {
      this.loadAnswerOptions(this.current.question.display);
    }

  }

  loadAnswerOptions(display: string) {

    if (display == 'radio') {
      this.radioOptions = this.current.question.answer_options.selection.map(optionData => {
        return {
          selected: false,
          optionData: optionData
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
      // console.log(this.textInput);
    }
  }
  

  previous(currentIndex: number) {
    if (currentIndex == 0) {
      return
    }
    this.setResponseData(null, currentIndex);
    this.go(false, currentIndex);
  }


  skip(currentIndex: number) {
    // this.setAnswer([], currentIndex);
    this.current.skipped = true;
    // Have no answers
    this.captureData()
    this.go(true, currentIndex);
  }

  setClickedWhy() {
    this.current.clickedWhy = true;
  }

  clickRadioOption(index: number) {
    // Check if current question's answer options are single selection or multi selection
    let answer_type = this.current.question.answer_options.type;
    
    if (answer_type == 'single-selection') {

      // Run through all options to see which one was selected
      for (let i = 0; i < this.radioOptions.length; i++) {
        let option = this.radioOptions[i];
        
        //  i == index for the option that was selected
        if (i == index) {
          // Whenever we click, we either selected this option, or deselect it
          option.selected = !option.selected;
        } else {
          // This means this option was not selected, and should be set to false
          option.selected = false;
        }

      }
    }
    if (answer_type == 'multi-selection') {
      this.radioOptions[index].selected = !this.radioOptions[index].selected;
    }
    this.checkIfAnswered('radio');
  }

  selectDropDownOption(index: number) {

    for (let i = 0; i < this.dropDownOptions.length; i++) {
      this.dropDownOptions[i].selected = i == index ? true : false;
    }
    this.checkIfAnswered('drop-down');
  }

  updatingTextInput(value) {

    this.textInputInvalid = false;
    this.textInput = null;
    if (this.current.question.display == 'location') {
      if (value !== 'Atlanta') {
        this.textInputInvalid = !this.validateZipcode(value);
      }
      if (!this.textInputInvalid) {
        this.textInput = value;
      }
      // console.log(this.textInput);
    }
    this.checkIfAnswered(this.current.question.display);
  }

  validateZipcode(value: string) {
    const zipcode = new RegExp(/^\d{5}$/);
    return zipcode.test(value);
  }


  // This function is used to check whether or not the "next" button should appear
  // If at least one answer option is selected, then the next button should be enabled
  checkIfAnswered(display: string) {

    if (display == 'radio') {
      let numSelected = this.radioOptions.filter(option => option.selected).length;
      return this.isAnswered = numSelected > 0;
    }
    if (display == 'drop-down') {
      let numSelected = this.dropDownOptions.filter(option => option.selected).length;
      return this.isAnswered = numSelected > 0;
    }
    if (display == 'location') {
      return this.isAnswered = this.textInput ? true : false;
    }
  }

  // Gets the user metrics and loads up the next question
  next(currentIndex: number) {
    // User is ready to proceed

    // take corresponding tag information, and create answer object
    if (this.current.question.display == 'radio') {
      // extract corresponding tag information
      let answers = this.extractSelectedOptions(this.radioOptions)

      // create Data Object and add it to responseData
      this.captureData(answers);
    }
    else if (this.current.question.display == 'drop-down') {
      let answers = this.extractSelectedOptions(this.dropDownOptions)
      this.captureData(answers)
    }
    else if (this.current.question.display == 'location') {
      this.location = this.textInput;
      this.captureData([this.textInput]);
    }

    this.go(true, currentIndex);
  }

  // Adds to the targets, requirements, services, and specializations arrays as necessary
  // Returns a list of dicts of the answer_ids selected and their texts
  captureData(answers?: any[]) {
    // get the end time to figure out how long it took user to complete this
    let endTime = +new Date();
    let completionTime = endTime - this.current.startTime

    // create the data object
    let data = {
      qID : this.current.qID,
      answers: answers,
      clickedWhy: this.current.clickedWhy,
      skipped: this.current.skipped,
      completionTime: completionTime
    }

    this.setResponseData(this.current.index, data);
  }

  // captureData method for location question

  extractSelectedOptions(options: any[]) {
    let answers = []
    for (let i = 0; i < options.length; i++) {
      let option = options[i];

      // If we are on the location question, then options array is just one element that is string of location
      if (typeof option == 'string') {
        this.location = option;
      } else {
        if (option.selected) {
          // console.log(option)
          // Add all tag information for the option into user's master lists
          this.specializations.push(...option.optionData.specializations);
          this.services.push(...option.optionData.services);
          this.targets.push(...option.optionData.targets);
          this.requirements.push(...option.optionData.requirements);
          
          // Capture the answer_id and text for data evaluation of platform
          let temp = {
            answerID: option.optionData.answer_id,
            text: option.optionData.text
          }
          answers.push(temp)
        }
      }
    }
    return answers;
  }

  setResponseData(currentIndex: number, data: any) {
    this.responseData[currentIndex] = data;
    // console.log(this.responseData);
  }

  // Sets the "current index" to 1 + old current if going forward
  // Sets the "current index" to old current - 1 if going backward
  go(forward: boolean, currentIndex: number) {
    forward ? currentIndex++ : currentIndex--;
    if (currentIndex >= this.questions.length) {
      return this.surveyComplete = true;
    }
    this.loadQuestion(currentIndex);
    this.checkIfAnswered(this.current.question.display);
  }



  submit(saveOption: boolean) {
    this.sendAnswers.emit({
      location: this.location,
      specializations: this.specializations,
      services: this.services,
      targets: this.targets,
      requirements: this.requirements,
      responseData: this.responseData
    });
  }

}

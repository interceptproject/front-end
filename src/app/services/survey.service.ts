import { Injectable } from '@angular/core';

//TODO:: make it to Model later
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
  name: string
}

@Injectable()
export class SurveyService {
  private questions: Question[] = [{
    category: 'target',
    core: true,
    questionText: 'Are you over 18 years old?',
    helpText: 'Need to know your age blah blah blah',
    questionID: 1,
    answerOptions: {
      type: 'multi-selection',
      selection: [{
        id: 1,
        text: 'Over 18',
        tags: [1]
      }, {
        id: 2,
        text: 'Under 18',
        tags: [2]
      }]
    }
  }, {
    category: 'target',
    core: true,
    questionText: 'What is your gender?',
    helpText: 'Need to know your gender blah blah',
    questionID: 2,
    answerOptions: {
      type: 'multi-selection',
      selection: [{
        id: 1,
        text: 'Female', tags: [3]
      }, {
        id: 2,
        text: 'Male', tags: [4]
      }, {
        id: 3,
        text: 'Transgender (MtF)', tags: [3, 5]
      }, {
        id: 4,
        text: 'Transgender (FtM)', tags: [4, 5]
      }, {
        id: 5,
        text: 'Other/prefer not to answer', tags: []
      }]
    }
  }];
  private services: Service[] = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Shelter' },
    { id: 3, name: 'Rescue/Pickup' },
    { id: 4, name: 'Addiction Treatment' },
    { id: 5, name: 'Counseling/Therapy' }
  ];

  constructor() { }

  getQuestions() {
    return this.questions;
  }

  getServices() {
    return this.services;
  }

}

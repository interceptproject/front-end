import { Injectable } from '@angular/core';

//TODO:: make it to Model later
export interface Question {
  category: string,
  core: boolean,
  question_text: string,
  help_text: string,
  question_id: number,
  display: string,
  answer_options: {
    type: string,
    selection: Selection[]
  }
}

export interface Selection {
  text: string,
  targets: any[],
  services: any[],
  specializations: any[],
  requirements: any[]
}

export interface Service {
  id: number,
  name: string
}

@Injectable()
export class SurveyService {
  private questions = [{
    "category" : "service",
    "core" : true,
    "question_text" : "I need",
    "help_text" : "This is to understand which services you need.",
    "question_id" : 1,
    "display" : "radio",
    "answer_options" : {
        "type" : "multi-selection",
        "selection" : [{
          "text" : "Food",
          "services" : [ 21],
          "targets" : [],
          "specializations" : [],
          "requirements" : []
        }, {
          "text" : "Psychological Counseling",
          "services" : [7, 8],
          "targets" : [],
          "specializations" : [],
          "requirements" : []
        }, {
          "text" : "Shelter",
          "services" : [16, 19],
          "targets" : [],
          "specializations" : [],
          "requirements" : []
        }, {
          "text" : "Drug Treatment",
          "services" : [
                    9
                ],
                "targets" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Rescue/Pickup",
                "services" : [
                    1,
                    2
                ],
                "targets" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Other (Not Listed)",
                "services" : [
                    3,
                    4,
                    5,
                    6,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    17,
                    18,
                    20
                ],
                "targets" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "I Just Want Some Help (Not Sure)",
                "services" : [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                   18,
                    19,
                    20,
                    21
                ],
                "targets" : [],
                "specializations" : [],
                "requirements" : []
            }
        ]
    }
},
{
    "category" : "location",
    "core" : true,
    "question_text" : "I'm currently at",
    "help_text" : "This information will only be used to find locations that are near you. This data will be kept anonymous and confidential and will not be shared with law enforcement. If you provide a street address, no one will be sent to that location.",
    "question_id" : 2,
    "display" : "location",
    "answer_options" : {
        "type" : "location",
        "selection": []
    }
},
{
    "category" : "target",
    "core" : true,
    "question_text" : "My age is",
    "help_text" : "Some organizations only serve minors, while others only serve adults. Your age info will be used only for finding organizations that serve your age group.",
    "question_id" : 3,
    "display" : "radio",
    "answer_options" : {
        "type" : "single-selection",
        "selection" : [
            {
                "text" : "Over 18",
                "targets" : [1],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Under 18",
                "targets" : [7],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            }
        ]
    }
},
{
    "category" : "target",
    "core" : true,
    "question_text" : "My gender is",
    "help_text" : "Some organizations only serve women, while some serve men as well. This information will only be used for finding organizations that serve your gender.",
    "question_id" : 4,
    "display" : "radio",
    "answer_options" : {
        "type" : "single-selection",
        "selection" : [
            {
                "text" : "Male",
                "targets" : [6],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Female",
                "targets" : [3],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Transgender Male-to-Female",
                "targets" : [1],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Transgender Female-to-Male",
                "targets" : [9],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            }
        ]
    }
},
{
    "category" : "target",
    "core" : true,
    "question_text" : "My nationality is",
    "help_text" : "Some organizations serve only U.S. citizens, while others are dedicated to foreign nationals. This information will be kept confidential and anonymous and will not be shared with any authorities or government agencies.",
    "question_id" : 5,
    "display" : "drop-down",
    "answer_options" : {
        "type" : "single-selection",
        "selection" : [
            {
                "text" : "U.S. Citizen/Legal Permanent Resident",
                "targets" : [2],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            },
            {
                "text" : "Foreign National",
                "targets" : [4],
                "services" : [],
                "specializations" : [],
                "requirements" : []
            }
        ]
    }
},
{
    "category" : "requirement",
    "core" : true,
    "question_text" : "Do you have dependents coming with you?",
    "help_text" : "Some organizations do not allow people to take their children with them, while some do. If you have dependents coming with you, this information will be used to find organizations that will allow you to bring them.",
    "question_id" : 6,
    "display" : "radio",
    "answer_options" : {
        "type" : "single-selection",
        "selection" : [
            {
                "text" : "Yes",
                "requirements" : [],
                "services" : [],
                "specializations" : [],
                "targets" : []
            },
            {
                "text" : "No",
                "requirements" : [1],
                "services" : [],
                "specializations" : [],
                "targets" : []
            }
        ]
    }
},
{
    "category" : "specialization",
    "core" : true,
    "question_text" : "Select all that apply to you",
    "help_text" : "Some organizations are especially capable to serve certain demographics. If you are any of the above demographics, this information will be used to find organizations that have specialized competencies toward those groups.",
    "question_id" : 7,
    "display" : "radio",
    "answer_options" : {
        "type" : "multi-selection",
        "selection" : [
            {
                "text" : "I am LGBTQI",
                "specializations" : [1],
                "services" : [],
                "targets" : [],
                "requirements" : []
            },
            {
                "text" : "I have disabilities",
                "specializations" : [3],
                "services" : [],
                "targets" : [],
                "requirements" : []
            },
            {
                "text" : "I am an American Indian or Alaskan Native",
                "specializations" : [2],
                "services" : [],
                "targets" : [],
                "requirements" : []
            }
        ]
    }
},
{
    "category" : "requirement",
    "core" : false,
    "question_text" : "I have a drug addiction and am willing to get treated for it.",
    "help_text" : "Some organizations require those who come in to get treated for their drug addiction, regardless if the person originally wanted to. If you have a drug addiction, but are not willing to get treated for it, answer “no.”",
    "question_id" : 8,
    "display" : "radio",
    "answer_options" : {
        "type" : "single-selection",
        "selection" : [
            {
                "text" : "Yes",
                "requirements" : [2],
                "services" : [],
                "specializations" : [],
                "targets" : []
            },
            {
                "text" : "No",
                "requirements" : [],
                "services" : [],
                "specializations" : [],
                "targets" : []
            }
        ]
    }
}

];
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

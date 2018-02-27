import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AjaxService {
  mLabUrl = "https://api.mlab.com/api/1/databases/intercept/collections/"
  apiKey ="dNt29mbxqxK905XC1ZK1mcH60XkjR5gh";
  apiKeyString = "?apiKey=" + this.apiKey;

  interceptUrl = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? "http://localhost:5050" : "http://interceptproject.org:5050";
//  rev_orgs:Observable<any>;
    rev_orgs = [];
    surveyData;

  private getMLabUrl(collection) {
    console.log(this.mLabUrl + collection + this.apiKeyString);
    return this.mLabUrl + collection + this.apiKeyString;
  }

  constructor(private http: Http) { }

  getOrganizations(): Observable<any> {
    let backup = this.getMLabUrl('organizations');
    //return this.http.get(backup).map((res) => res.json());
    return this.http.get(this.interceptUrl + '/organization').map((res) => res.json());
  }

  getDummyQuestions(): Observable<any> {
    return this.http.get('assets/dummy_questions.json')
      .map((res) => res.json());
  }

  getQuestions(): Observable<any> {
    // let backup = this.getMLabUrl('questions');
    //return this.http.get(backup).map((res: Response) => res.json());
    return this.http.get(this.interceptUrl + "/questions").map((res: Response) => res.json());
  }

  submitSurvey(surveyData): Observable<any> {
//  submitSurvey(surveyData) {
    return this.http.post(this.interceptUrl + '/surveySubmit', surveyData).map((res: Response) => res.json());
//    this.http.post(this.interceptUrl + '/surveySubmit', surveyData).map((res: Response) => res.json()).subscribe(
//        (data) => {
//            this.rev_orgs = data;
//            console.log(data);
//        },
//        (err) => console.log("Something weird is going on"));
//      console.log(this.rev_orgs);
//      console.log("this is type of rev+orgs: " + typeof(this.rev_orgs));
//      return this.rev_orgs;
//    return this.rev_orgs;
  }
}

import { Component, OnInit } from '@angular/core';
import { AjaxService } from './../../services/ajax.service';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  organizations:Array<any>;

  
  constructor(
    private ajxSvc: AjaxService
  ) { }
  initializeOrganizationData() {
      
//    this.ajxSvc.getOrganizations().subscribe(
//      (data) => {
//        console.log(data);
//        this.organizations = data.slice(0, 10);
//      }, (err) => console.log(err.json())
//    );
//      this.organizations = this.route.snapshot.params['results'];
    this.ajxSvc.submitSurvey(this.ajxSvc.surveyData).subscribe(
      (data) => {
        console.log(data);
        this.organizations = data;
      }, (err) => console.log(err.json())
    );
//      this.organizations = this.ajxSvc.rev_orgs;
//      console.log("in search-results componenet");
//      console.log(this.ajxSvc.rev_orgs);
//      console.log(this.organizations);
//      console.log("This is type: " + typeof(this.organizations));
//      console.log(this.organizations[0]);
  }
  ngOnInit() {
    this.initializeOrganizationData();
  }

}

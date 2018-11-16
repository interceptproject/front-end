import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AjaxService } from './../../core/services/ajax.service';
import { DataService } from './../../core/services/data.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
//  organizations: any[] = [{
//    name: "Dummy Organization",
//    website: 'www.dummy-org.org',
//    contact: {
//      main: '777-888-9090',
//      email: 'dummyorg@dummy-org.org'
//    },
//    location: {
//      public: {
//        address: {
//          street1: '123 Tech Parkway',
//          street2: null,
//          city: 'Atlanta',
//          state: 'GA',
//          zipcode: '30313'
//        },
//        fullAddress: '123 Tech Parkway Atlanta, GA 30313'
//      }
//    }
//  }];
  organizations: any[] = [];
  querySub: Subscription;
  surveyID: string = '20102';

  constructor(
    private route: ActivatedRoute,
    private ajaxService: AjaxService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentList.subscribe(orgs => this.organizations = orgs)
    console.log(this.organizations)
    // this.querySub = this.route.queryParams.subscribe(
    //   (params) => {
    //     //use query params to get search result & survey recor
    //     console.log(params)
    //   }, (err) => console.log(err)
    // );
  }

  getOrganizations() {
    let userData = {
      "location" : "120 North Avenue NW",
      "specializations" : [1,2,3,6,9],
      "services" : [1,2,6,7,8],
      "targets" : [2],
      "requirements" : []
    }
    console.log(userData);

    this.ajaxService.getRelevantOrganizations(userData)
      .subscribe(
        (response) => {
            this.organizations = response;
            console.log(response);
        },
        (error) => console.log(error)
    );
  }

}

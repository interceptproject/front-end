import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  organizations: any[] = [{
    name: "Dummy Organization",
    website: 'www.dummy-org.org',
    contact: {
      main: '777-888-9090',
      email: 'dummyorg@dummy-org.org'
    },
    location: {
      public: {
        address: {
          street1: '123 Tech Parkway',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zipcode: '30313'
        },
        fullAddress: '123 Tech Parkway Atlanta, GA 30313'
      }
    }
  }];
  querySub: Subscription;
  surveyID: string = '20102';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route);
    this.querySub = this.route.queryParams.subscribe(
      (params) => {
        //use query params to get search result & survey record
      }, (err) => console.log(err)
    );
  }

}

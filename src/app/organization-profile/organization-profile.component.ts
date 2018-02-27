import { Component, OnInit } from '@angular/core';
import { AjaxService } from './../services/ajax.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  organizations: any[];
  organization_id: number;
  organization: any;
  organization_name: string;
  organization_service_names: any[];
  organization_services: any[];
  organization_populations: any[];
  organization_mission_statement: string;
  organization_contact_info: any;
  organization_location: any;
  organization_service_area: string;

  constructor(
    private ajxSvc: AjaxService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ajxSvc.getOrganizations().subscribe(
      (data) => {
        this.organizations = data;
        this.route.params.subscribe((params: Params) => {
          this.organization_id = +params['id'];
          this.organization = this.organizations[this.organization_id];
          this.organization_name = this.organization.name;
          this.organization_mission_statement = this.organization.mission_statement;
          this.organization_services = this.organization.services;
          this.organization_service_names = Object.keys(this.organization_services);
          this.organization_populations = this.organization.populations;
          this.organization_location = this.organization.coordinates;
          this.organization_service_area = this.organization.service_area;
          this.organization_contact_info = this.organization.contact_info;
          console.log(this.organization_services);
        });
      }, (err) => console.log(err)
    )
  }
}

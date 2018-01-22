import { Component, OnInit } from '@angular/core';
import { AjaxService } from './../services/ajax.service';
import { NavService } from './../services/nav.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  organizations: any[];
  constructor(
    private ajxSvc: AjaxService,
    private navSvc: NavService
  ) { }
  ngOnInit() {
    console.log('about');
    this.initializeOrganizationData();
  }
  initializeOrganizationData() {
    this.ajxSvc.getOrganizations().subscribe(
      (data) => {
        console.log(data);
        this.organizations = data;
      }, (err) => console.log(err.json())
    );
  }
  makeNavAvailable() {
    this.navSvc.openNav(1);
  }
}

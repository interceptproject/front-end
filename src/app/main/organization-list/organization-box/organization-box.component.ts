import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organization-box',
  templateUrl: './organization-box.component.html',
  styleUrls: ['./organization-box.component.scss']
})
export class OrganizationBoxComponent implements OnInit {
  /*
  Organization is the "organization" passed in from organization-list component for individual display
  */
  @Input() organization:object;
    
  constructor() { }

  ngOnInit() {
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationBoxComponent } from './organization-box.component';

describe('OrganizationBoxComponent', () => {
  let component: OrganizationBoxComponent;
  let fixture: ComponentFixture<OrganizationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

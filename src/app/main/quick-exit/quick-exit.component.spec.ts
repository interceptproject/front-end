import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickExitComponent } from './quick-exit.component';

describe('QuickExitComponent', () => {
  let component: QuickExitComponent;
  let fixture: ComponentFixture<QuickExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

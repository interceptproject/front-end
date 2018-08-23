import { NgModule } from '@angular/core';
import { AjaxService } from './services/ajax.service';
import { SurveyService } from './services/survey.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AjaxService,
    SurveyService
  ]
})
export class CoreModule { }

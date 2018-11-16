import { NgModule } from '@angular/core';
import { AjaxService } from './services/ajax.service';
import { SurveyService } from './services/survey.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AjaxService,
    SurveyService,
    DataService
  ]
})
export class CoreModule { }

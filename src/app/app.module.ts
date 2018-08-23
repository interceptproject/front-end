import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './header/nav/nav.component';
import { LanguageOptionsComponent } from './header/language-options/language-options.component';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { OrganizationListComponent } from './main/organization-list/organization-list.component';
import { OrganizationBoxComponent } from './main/organization-list/organization-box/organization-box.component';
import { SurveyComponent } from './main/survey/survey.component';
import { QuestionBoxComponent } from './main/survey/question-box/question-box.component';

import { QuickExitComponent } from './utilities/quick-exit/quick-exit.component';

import { UtilityBarComponent } from './utilities/utility-bar/utility-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LanguageOptionsComponent,
    MainComponent,
    NavComponent,
    OrganizationBoxComponent,
    OrganizationListComponent,
    QuestionBoxComponent,
    QuickExitComponent,
    SurveyComponent,
    UtilityBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

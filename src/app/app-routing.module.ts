import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './main/organization-list/organization-list.component';
import { SurveyComponent } from './main/survey/survey.component';

export const appRoutes: Routes = [
  {path: 'organizations', component: OrganizationListComponent},
  {path: 'survey', component: SurveyComponent, runGuardsAndResolvers: 'always'},
  {path: '', component: SurveyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadingComponent} from './loading/loading.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'loading', pathMatch: 'full'},
  {path: 'loading', component: LoadingComponent},
  {path: 'home', loadChildren: './weather-guardian/weather-guardian.module#WeatherGuardianModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {}

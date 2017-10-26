import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherGuardianComponent} from './weather-guardian.component';

const wgRoutes: Routes = [
  {path: '', component: WeatherGuardianComponent}
];

@NgModule({
  imports: [RouterModule.forChild(wgRoutes)],
  exports: [RouterModule],
  providers: []
})

export class WeatherGuardianRoutingModule {}

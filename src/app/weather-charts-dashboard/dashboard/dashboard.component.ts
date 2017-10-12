import {Component, OnDestroy, OnInit, ViewChildren, ViewContainerRef} from '@angular/core';
import {MatSelect} from "@angular/material";
import {HostDirective} from "../host.directive";
import {DataVisualizationService} from "../../services/data-visualization.service";
import {GeocodeService} from "../../services/geocode.service";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  locationSubscription;
  isLocationSet = false;
  functionalUnitsList: string[];
  tiles = [];
  mediaQueryWatcher: Subscription;
  activeMediaQuery = '';
  col = 2;
  @ViewChildren(HostDirective) host;

  constructor(private dataVisualizationService: DataVisualizationService,
              private geocodeService: GeocodeService,
              private media: ObservableMedia) {

    if (this.media.isActive('xs') || this.media.isActive('md')) {
      this.col = 1;
    } else {
      this.col = 2;
    }

    this.mediaQueryWatcher = this.media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

      if (this.media.isActive('xs') || this.media.isActive('sm')) {
        this.col = 1;
      } else {
        this.col = 2;
      }

    });

  }

  ngOnInit() {
    this.functionalUnitsList = this.dataVisualizationService.charts;
    this.locationSubscription = this.geocodeService.selectedLocation$.subscribe((location) => {

      if (location) {
        this.isLocationSet = true;
      } else {
        this.isLocationSet = false;
      }
    });
  }
  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

  onUnitSelection(select: MatSelect) {
    if (this.functionalUnitsList.indexOf(select.value) >= 0) {
      // find and remove selected unit from the options list
      const index = this.functionalUnitsList.indexOf(select.value);
      const selected = this.functionalUnitsList.splice(index, 1)[0];
      // and create a new tile
      this.tiles.push({text: 'One', cols: 1, rows: 1, color: 'clear', child: selected});
      // places the code below in the callback queue, to ensure that the parent tile is rendered
      // prior to attaching the component as a child.
      setTimeout(() => {
        const hosts: HostDirective[] = this.host.toArray();
        let viewContainerRef: ViewContainerRef;
        for (let i = 0; i < hosts.length; i++) {
          if (hosts[i].viewContainerRef.length === 0) {
            viewContainerRef = hosts[i].viewContainerRef;
            break;
          }
        }
        if (viewContainerRef) {
          this.dataVisualizationService.DVFactory(selected, viewContainerRef);
        }
      }, 0);
    }
  }
  onRemoveUnit(i: number) {
    if (this.tiles[i].child !== '') {
      this.dataVisualizationService.removeDV(this.tiles[i].child);
      this.functionalUnitsList.push(this.tiles[i].child);
      this.functionalUnitsList.sort();
      this.tiles[i].child = '';
      this.tiles.splice(i, 1);
    }
  }

}

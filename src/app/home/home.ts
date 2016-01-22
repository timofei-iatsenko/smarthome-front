import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from './providers/title';

import {ZoneControlComponent} from '../controls/zone-control/zone-control.component.ts';
import {TempControlComponent} from '../controls/temp-control/temp-control.component.ts';
import {TempControlProvider} from '../controls/temp-control/temp-control.provider.ts';
import {WavesDirective} from '../common';

import {FloorPlanDirective} from '../directives/floor-plan.directive.ts';

import {ZoneConfig} from '../zones/index';
import {ZoneModel} from '../zones/zone.model.ts';
import {ZonesStoreProvider} from '../zones/zones-store.provider.ts';
import {ZoneDirective} from '../directives/zone.directive.ts';
import {ZONES} from '../config';
import _  = require('lodash');

@Component({
  selector: 'home',
  providers: [
    ZonesStoreProvider,
    TempControlProvider
  ],
  directives: [
    ...FORM_DIRECTIVES,
    WavesDirective,
    ZoneControlComponent,
    TempControlComponent,
    FloorPlanDirective,
    ZoneDirective
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.jade')
})
export class Home {
  // TypeScript public modifiers
  expanded = false;
  settingsExpanded = false;
  zones: ZoneModel[];

  constructor(private zonesStore: ZonesStoreProvider) {

  }

  toggleSettings() {
    this.settingsExpanded = !this.settingsExpanded;
  }
  toggle() {
    this.expanded = !this.expanded;
  }

  ngOnInit() {
    _.map(ZONES, (zoneConfig) => {
      this.zonesStore.add(new ZoneModel(zoneConfig));
    });

    this.zones = this.zonesStore.items;
  }

}

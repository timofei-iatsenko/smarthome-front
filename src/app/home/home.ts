import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {ZoneControlComponent} from '../controls/zone-control/zone-control.component.ts';
import {TempControlComponent} from '../controls/temp-control/temp-control.component.ts';
import {TempControlProvider} from '../controls/temp-control/temp-control.provider.ts';
import {WavesDirective} from '../common/index';

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
    ZoneDirective
  ],
  pipes: [ ],
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

import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {ZoneControlComponent} from '../controls/zone-control/zone-control.component.ts';
import {TempControlComponent} from '../controls/temp-control/temp-control.component.ts';
import {TempControlProvider} from '../controls/temp-control/temp-control.provider.ts';
import {WavesDirective} from '../common/index';

import {ZoneConfig} from '../zones/index';
import {ZoneModel} from '../zones/zone.model.ts';
import {ZoneDirective} from '../directives/zone.directive.ts';
import {ZONES} from '../config';
import {SettingsPanelComponent} from '../settings/settings-panel/settings-panel.component.ts';
import {StatusAreaComponent} from '../controls/status-area/status-area.component';
import {SettingsProvider} from '../settings/settings.provider';
import {ZonesStoreProvider} from '../zones/zones-store.provider';

@Component({
  selector: 'home',
  providers: [
    ZonesStoreProvider,
    TempControlProvider,
    SettingsProvider
  ],
  directives: [
    WavesDirective,
    ZoneControlComponent,
    TempControlComponent,
    ZoneDirective,
    SettingsPanelComponent,
    StatusAreaComponent
  ],
  pipes: [ ],
  template: require('./home.jade')
})
export class Home {
  settingsExpanded = false;
  zones: ZoneModel[];

  constructor(private zonesStore: ZonesStoreProvider) {

  }

  get zoneTitle() {
    if (this.zonesStore.selected) {
      return this.zonesStore.selected.title;
    }

    return null;
  }

  toggleSettings() {
    this.settingsExpanded = !this.settingsExpanded;
  }

  ngOnInit() {
    _.map(ZONES, (zoneConfig) => {
      this.zonesStore.add(new ZoneModel(zoneConfig));
    });

    this.zones = this.zonesStore.items;
  }
}

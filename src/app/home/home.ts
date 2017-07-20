import { Component, OnInit } from '@angular/core';

import { TempControlProvider } from '../controls/temp-control/temp-control.provider';
import { ZoneModel } from '../zones/zone.model';

import { SettingsProvider } from '../settings/settings.provider';
import { ZonesStoreProvider } from '../zones/zones-store.provider';

import template from './home.jade';

@Component({
  selector: 'home',
  providers: [
    TempControlProvider,
    SettingsProvider
  ],
  template
})
export class HomeComponent implements OnInit {
  settingsExpanded = false;
  zones: ZoneModel[];

  constructor(private zonesStore: ZonesStoreProvider) {}

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
    this.zones = this.zonesStore.items;
  }
}

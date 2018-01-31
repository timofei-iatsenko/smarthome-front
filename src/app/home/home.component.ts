import { Component, OnInit } from '@angular/core';

import { TempControlProvider } from '../controls/temp-control/temp-control.provider';
import { ZoneModel } from '../zones/zone.model';

import { SettingsService } from '../settings/settings.service';
import { ZonesStoreProvider } from '../zones/zones-store.provider';

@Component({
  selector: 'home',
  providers: [
    TempControlProvider,
    SettingsService
  ],
  templateUrl: './home.html',
  styleUrls: ['home.scss'],
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

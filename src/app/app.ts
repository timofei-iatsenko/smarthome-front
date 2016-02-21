/*
 * Angular 2 decorators and services
 */
import {Component, OnInit, PLATFORM_DIRECTIVES, provide} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {Home} from './home/home';
import {BackendProvider} from './common/backend.provider';
import {AcUnitProvider} from './common/ac-unit.provider';
import {ZONES} from './config';
import {ZoneModel} from './zones/zone.model';
import {ZonesStoreProvider} from './zones/zones-store.provider';

require('./app.scss');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    ZonesStoreProvider,
    BackendProvider,
    AcUnitProvider,
  ],
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])

export class App implements OnInit {

  constructor(private acUnit: AcUnitProvider, private backend: BackendProvider, private zonesStore: ZonesStoreProvider) {}

  ngOnInit() {
    this._buildZones();
    this. _bindBackendEvents();
  }

  _buildZones() {
    _.map(ZONES, (zoneConfig) => {
      const model = new ZoneModel(zoneConfig);
      this.zonesStore.add(model);

      model.onSetpointChanged.bind(_.debounce(() => {
        this.backend.setZoneSetpoint(model.id, model.tempSetpoint);
      }, 300));

      model.onEnabledChanged.bind(_.debounce(() => {
        this.backend.setZoneEnable(model.id, model.enabled);
      }, 300));
    });
  }

  _bindBackendEvents() {
    this.backend.onData.bind((data) => {
      console.log('onData event', data);

      _.each(data.zones, (zoneData) => {
        this._updateZoneFromBackend(zoneData);
      });

      _.assign(this.acUnit, data.acUnit);
    });

    this.backend.onAcUnitChanged.bind((data) => {
      console.log('AcUnitChanged event');
      _.assign(this.acUnit, data);
    });

    this.backend.onZoneChanged.bind((zoneData) => {
      console.log('zonechanged event');
      this._updateZoneFromBackend(zoneData);
    });
  }

  _updateZoneFromBackend(zoneData) {
    const zone = this.zonesStore.getById(zoneData.id);

    console.log(zone, zoneData);
    zone.ambientTemp = zoneData.ambientTemp;
    zone.tempSetpoint = zoneData.tempSetpoint;
    zone.enabled = zoneData.enabled;
  }
}

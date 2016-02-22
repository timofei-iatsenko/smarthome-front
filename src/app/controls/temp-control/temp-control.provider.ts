import {Injectable} from 'angular2/core';
import {ITempControllable} from '../../interfaces.ts';
import {ZonesStoreProvider} from '../../zones/zones-store.provider';
import {ZoneModel} from '../../zones/zone.model';
import {TEMP_STEP} from '../../config';

const DEFAULT_SETPOINT = 24;

class CommonTemperature implements ITempControllable {
  protected _setpoint: number;

  constructor(protected _zonesStore: ZonesStoreProvider) {
    const zones = this.zones;
    this._setpoint = zones.length ?  zones[0].tempSetpoint : DEFAULT_SETPOINT;
    this._bindEvents();
  }

  protected _bindEvents() {
    _.each(this._zonesStore.items, (zone: ZoneModel) => {
      zone.onSyncChanged.bind(() => {
        if (zone.sync) {
          zone.tempSetpoint = this._setpoint;
        }
      });
    });
  }

  get zones(): ZoneModel[] {
    return this._zonesStore.filter((zone) => zone.sync);
  }

  incrementTemp() {
    this._setpoint = this._setpoint + TEMP_STEP;
    this._updateZones();
  }

  decrementTemp() {
    this._setpoint = this._setpoint - TEMP_STEP;
    this._updateZones();
  }

  get tempSetpoint() {
    return this._setpoint;
  }

  protected _updateZones() {
    _.each(this.zones, (zone: ZoneModel) => {
      zone.tempSetpoint = this._setpoint;
    });
  }
}

@Injectable()
export class TempControlProvider {
  public currentTarget: ITempControllable;
  protected commonTemp: CommonTemperature;
  protected _element: Element;
  protected _isCommonMode;

  constructor(zonesStore: ZonesStoreProvider) {
    this.commonTemp = new CommonTemperature(zonesStore);
    this.setCommon();
  }

  isCommonMode() {
    return this._isCommonMode;
  }

  setZone(zone: ITempControllable) {
    this._isCommonMode = false;
    this.currentTarget = zone;
  }

  setCommon() {
    this._isCommonMode = true;
    this.currentTarget = this.commonTemp;
  }

  get nativeElement() {
    return this._element;
  }

  set nativeElement(value) {
    this._element = value;
  }
}

import { Injectable } from '@angular/core';
import { ITempControllable } from '../../interfaces';
import { ZonesStoreProvider } from '../../zones/zones-store.provider';
import { ZoneModel } from '../../zones/zone.model';
import { TEMP_STEP } from '../../config';

const DEFAULT_SETPOINT = 24;

class CommonTemperature implements ITempControllable {
  protected setpoint: number;

  constructor(protected zonesStore: ZonesStoreProvider) {
    const zones = this.zones;
    this.setpoint = zones.length ? zones[0].tempSetpoint : DEFAULT_SETPOINT;
    this.bindEvents();
  }

  get zones(): ZoneModel[] {
    return this.zonesStore.filter((zone) => zone.sync);
  }

  incrementTemp() {
    this.setpoint = this.setpoint + TEMP_STEP;
    this._updateZones();
  }

  decrementTemp() {
    this.setpoint = this.setpoint - TEMP_STEP;
    this._updateZones();
  }

  get tempSetpoint() {
    return this.setpoint;
  }

  protected _updateZones() {
    this.zones.forEach((zone: ZoneModel) => {
      zone.tempSetpoint = this.setpoint;
    });
  }

  protected bindEvents() {
    this.zonesStore.items.forEach((zone: ZoneModel) => {
      zone.onChanged.bind(() => {
        if (zone.sync) {
          zone.tempSetpoint = this.setpoint;
        }
      });
    });
  }
}

@Injectable()
export class TempControlProvider {
  public currentTarget: ITempControllable;
  private commonTemp: CommonTemperature;
  private _element: Element;
  private _isCommonMode: boolean;

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

import { Room } from '../common/backend/room';
import { ControlPosition, RoomConfig } from './index';
import { ITempControllable } from '../interfaces';
import { SimpleEvent } from '../libs/simple-event';
import { TEMP_STEP } from '../config';

export interface IZoneModelDto {
  enabled: boolean;
  sync: boolean;
  tempSetpoint: number;
}

export class ZoneModel implements ITempControllable {
  public ambientTemp: number;
  public enabled: boolean;
  public selected: boolean;
  public _sync: boolean;
  public controlPosition: ControlPosition;
  public id: number;
  public title: string;

  public onChanged = new SimpleEvent();

  private _tempSetpoint: number;

  constructor(config: RoomConfig) {
    this.controlPosition = config.position;
    this.id = config.id;
    this.title = config.title;

    this.enabled = false;
    this.ambientTemp = null;
    this._tempSetpoint = null;
  }

  get sync() {
    return this._sync;
  }

  set sync(value) {
    if (this._sync !== value) {
      this._sync = value;
      this.onChanged.trigger();
    }
  }

  get tempSetpoint() {
    return this._tempSetpoint;
  }

  set tempSetpoint(value) {
    if (value !==  this._tempSetpoint) {
      this._tempSetpoint = value;
      this.onChanged.trigger();
    }
  }

  public setBackendData(zoneData: Room) {
    this.ambientTemp = zoneData.ambientTemp;
    this._tempSetpoint = zoneData.tempSetpoint;
    this.enabled = zoneData.enabled;
    this._sync = zoneData.sync;
  }

  public incrementTemp() {
    this.enable();
    this.tempSetpoint = this.tempSetpoint + TEMP_STEP;
  }

  public decrementTemp() {
    this.enable();
    this.tempSetpoint = this.tempSetpoint - TEMP_STEP;
  }

  public enable() {
    this.enabled = true;
    this.onChanged.trigger();
  }

  public disable() {
    this.enabled = false;
    this.onChanged.trigger();
  }

  public toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }

  getDto(): IZoneModelDto {
    const dto: IZoneModelDto = {
      tempSetpoint: null,
      sync: null,
      enabled: null,
    };

    Object.keys(dto).forEach((prop) => {
      dto[prop] = this[prop];
    });

    return dto;
  }
}

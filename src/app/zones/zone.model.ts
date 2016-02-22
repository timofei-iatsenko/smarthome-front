import {ControlPosition, ZoneConfig} from './index.ts';
import {ITempControllable} from '../interfaces.ts';
import {SimpleEvent} from '../libs/simple-event';
import {TEMP_STEP} from '../config';
import {Backend} from '../common/backend.provider';

export interface IZoneModelDto {
  enabled: boolean;
  sync: boolean;
  tempSetpoint: number;
}

export class ZoneModel implements ITempControllable {
  public ambientTemp: number;
  protected _tempSetpoint: number;
  public enabled: boolean;
  public selected: boolean;
  public _sync: boolean;
  public controlPosition: ControlPosition;
  public id: number;
  public title: string;

  public onSetpointChanged = new SimpleEvent();
  public onEnabledChanged = new SimpleEvent();
  public onSyncChanged = new SimpleEvent();

  constructor(config: ZoneConfig) {
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
    this._sync = value;
    this.onSyncChanged.trigger();
  }

  get tempSetpoint() {
    return this._tempSetpoint;
  }

  set tempSetpoint(value) {
    this._tempSetpoint = value;
    this.onSetpointChanged.trigger();
  }

  public setBackendData(zoneData: Backend.Zone) {
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
    this.onEnabledChanged.trigger();
  }

  public disable() {
    this.enabled = false;
    this.onEnabledChanged.trigger();
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

    _.each(dto, (val, prop) => {
      dto[prop] = this[prop];
    });

    return dto;
  }
}

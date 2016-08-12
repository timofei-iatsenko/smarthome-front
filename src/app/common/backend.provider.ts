import {Injectable, NgZone} from 'angular2/core';
import {BACKEND} from '../config';
import {SimpleEvent} from '../libs/simple-event';
import {ZoneModel} from '../zones/zone.model';
import {IZoneModelDto} from '../zones/zone.model';

import io = require('socket.io-client');

export module Backend {

  export enum AcUnitMode {
    AUTO = 0,
    HEAT = 1,
    DRY = 2,
    FAN = 3,
    COOL = 4,
  }

  export interface AcUnit {
    MODES: Object;
    ambientTemp: number;
    enabled: boolean;
    fanSpeed: number;
    tempSetpoint: number;
    unitMode: AcUnitMode;
  }

  export interface Zone {
    ambientTemp: number;
    enabled: boolean;
    id: number;
    tempSetpoint: number;
    sync: boolean;
  }

  export interface BootstrapData {
    acUnit: AcUnit;
    zones: Zone[];
    intakeFanEnabled: boolean;
    exhaustFanEnabled: boolean;
  }
}

@Injectable()
export class BackendProvider {

  public socket: SocketIOClient.Socket = io.connect(BACKEND.host);
  public onData = new SimpleEvent<Backend.BootstrapData>();
  public onZoneChanged = new SimpleEvent<Backend.Zone>();
  public onAcUnitChanged = new SimpleEvent<Backend.AcUnit>();
  public connected = false;

  constructor() {
    this._linkEvents();
  }

  get connected() {
    return this.socket.connected;
  }

  changeZone(id: number, data: IZoneModelDto) {
    console.log('emit change zone');
    this.socket.emit('gui.changeZone', {id, data});
  }

  setZoneSetpoint(id: number, setpoint: number) {
    this.socket.emit('gui.setZoneSetpoint', {id, setpoint});
  }

  setZoneEnable(id: number, value: boolean) {
    this.socket.emit('gui.setZoneEnable', {id, value});
  }

  protected _linkEvents() {
    this.socket.on('data', (resp) => {
      this.onData.trigger(resp);
    });

    this.socket.on('zoneChanged', (resp) => {
      this.onZoneChanged.trigger(resp);
    });

    this.socket.on('acUnitChanged', (resp) => {
      this.onAcUnitChanged.trigger(resp);
    });
  }
}

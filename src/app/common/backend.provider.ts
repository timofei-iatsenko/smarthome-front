import {Injectable, NgZone} from 'angular2/core';
import {BACKEND} from '../config';
import {SimpleEvent} from '../libs/simple-event';

declare var io;

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
  }

  export interface BootstrapData {
    acUnit: AcUnit;
    zones: Zone[];
  }
}

@Injectable()
export class BackendProvider {

  protected socket: SocketIO.Socket = io.connect(BACKEND.host);
  public onData = new SimpleEvent<Backend.BootstrapData>();
  public onZoneChanged = new SimpleEvent<Backend.Zone>();
  public onAcUnitChanged = new SimpleEvent<Backend.AcUnit>();

  constructor() {
    this._linkEvents();
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

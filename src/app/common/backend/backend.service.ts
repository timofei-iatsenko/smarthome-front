import {Injectable} from '@angular/core';
import {BACKEND} from '../../config';
import {SimpleEvent} from '../../libs/simple-event';
import {IZoneModelDto} from '../../zones/zone.model';
import * as io from 'socket.io-client';
import { AcUnit } from './ac-unit';
import { Room } from './room';

export interface BootstrapData {
  acUnit: AcUnit;
  zones: Room[];
  intakeFanEnabled: boolean;
  exhaustFanEnabled: boolean;
}

@Injectable()
export class BackendService {
  public socket = io.connect(BACKEND.host);
  public onData = new SimpleEvent<BootstrapData>();
  public onZoneChanged = new SimpleEvent<Room>();
  public onAcUnitChanged = new SimpleEvent<AcUnit>();

  constructor() {
    this.linkEvents();
  }

  get connected() {
    return this.socket.connected;
  }

  changeZone(id: number, data: IZoneModelDto) {
    console.log('emit change zone');
    this.socket.emit('gui.changeZone', {id, data});
  }

  protected linkEvents() {
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

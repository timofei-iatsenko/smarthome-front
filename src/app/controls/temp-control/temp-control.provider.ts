import {Injectable} from 'angular2/core';
import {ZoneModel} from '../../zones/zone.model.ts';
import {ITempControllable} from '../../interfaces.ts';

class CommonTemperature implements ITempControllable {

  constructor(protected _setpoint: number) {}

  incrementTemp() {
    this._setpoint++;
  }

  decrementTemp() {
    this._setpoint--;
  }

  get tempSetpoint() {
    return this._setpoint;
  }
}

@Injectable()
export class TempControlProvider {
  public currentTarget: ITempControllable;
  protected commonTemp: CommonTemperature = new CommonTemperature(24);
  protected _element: Element;

  constructor() {
    this.currentTarget = this.commonTemp;
  }

  setZone(zone: ITempControllable) {
    this.currentTarget = zone;
  }

  setCommon() {
    this.currentTarget = this.commonTemp;
  }

  get nativeElement() {
    return this._element;
  }

  set nativeElement(value) {
    this._element = value;
  }
}

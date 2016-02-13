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
  protected _isCommonMode;

  constructor() {
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

import {ControlPosition, ZoneConfig} from './index.ts';
import {ITempControllable} from '../interfaces.ts';

export class ZoneModel implements ITempControllable {
  public ambientTemp: number;
  public tempSetpoint: number;
  public enabled: boolean;
  public selected: boolean;
  public sync: boolean;
  public controlPosition: ControlPosition;
  public id: number;
  public title: string;

  constructor(config: ZoneConfig) {
    this.controlPosition = config.position;
    this.id = config.id;
    this.title = config.title;

    this.enabled = false;
    this.ambientTemp = 22;
    this.tempSetpoint = 24;
  }

  public incrementTemp() {
    this.enable();
    this.tempSetpoint++;
  }

  public decrementTemp() {
    this.enable();
    this.tempSetpoint--;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public toggleEnabled() {
     this.enabled = !this.enabled;
  }

}

import {ControlPosition, ZoneConfig} from './index.ts';
import {ITempControllable} from '../interfaces.ts';
import {SimpleEvent} from '../libs/simple-event';
import {TEMP_STEP} from '../config';

export class ZoneModel implements ITempControllable {
  public ambientTemp: number;
  protected _tempSetpoint: number;
  public enabled: boolean;
  public selected: boolean;
  public sync: boolean;
  public controlPosition: ControlPosition;
  public id: number;
  public title: string;

  public onSetpointChanged = new SimpleEvent();
  public onEnabledChanged = new SimpleEvent();

  constructor(config: ZoneConfig) {
    this.controlPosition = config.position;
    this.id = config.id;
    this.title = config.title;

    this.enabled = false;
    this.ambientTemp = 22;
    this._tempSetpoint = 24;
  }

  get tempSetpoint() {
    return this._tempSetpoint;
  }

  set tempSetpoint(value) {
    this._tempSetpoint = value;
  }

  public incrementTemp() {
    this.enable();
    this.onSetpointChanged.trigger();
    this.tempSetpoint = this.tempSetpoint + TEMP_STEP;
  }

  public decrementTemp() {
    this.enable();
    this.onSetpointChanged.trigger();
    this.tempSetpoint = this.tempSetpoint - TEMP_STEP;
  }

  public enable() {
    this.onEnabledChanged.trigger();
    this.enabled = true;
  }

  public disable() {
    this.onEnabledChanged.trigger();
    this.enabled = false;
  }

  public toggleEnabled() {
     this.enabled ? this.disable() : this.enable();
  }

}

import {Injectable} from 'angular2/core';
import {SettingsModel} from './settings.model.ts';

enum FanSpeed {
  Max, Middle, Min
}

enum AcMode {
  Cool, Heat, Dry, Auto
}

@Injectable()
export class SettingsProvider {

  // public acFanSpeed: FanSpeed = FanSpeed.Middle;
  public acMode: AcMode = AcMode.Cool;
  public hoodEnabled: boolean;
  public airInputEnabled: boolean;

  constructor() {

  }
}

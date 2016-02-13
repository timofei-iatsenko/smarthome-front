import {ISettingsAdapter} from './settings-adapter.interface';

export class SettingsHoodAdapter implements ISettingsAdapter {

  protected _enabled = false;

  setValue(value: boolean) {
    console.log('Hood set to ', value ? 'on' : 'off');
    this._enabled = value;
  }

  getValue(): boolean {
    return this._enabled;
  }
}

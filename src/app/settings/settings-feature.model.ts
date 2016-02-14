import {Injectable} from 'angular2/core';
import {SETTINGS_FEATURES} from '../config';
import {Settings} from '../interfaces';

@Injectable()
export abstract class SettingsBaseFeatureModel {
  protected _key: string;
  inStatusBar: boolean;
  adapter: Settings.IAdapter;

  constructor(config: Settings.IFeatureConfig) {
    this._key = config.key;
    this.inStatusBar = config.inStatusBar;

    if (typeof(config.adapter) ==  'function') {
      this.adapter =  new config.adapter;
    }
  }

  abstract getTitle(): string;
  abstract isActive(): boolean;
  abstract getIcon(): string;
  abstract hasOptions(): boolean;
}

export class SettingsToggleFeatureModel extends SettingsBaseFeatureModel {
  protected _icon: string;
  protected _name: string;
  protected _enabled: boolean;

  constructor(config: Settings.IFeatureConfig) {
    super(config);

    this._icon = config.icon;
    this._name = config.name;
  }

  toggle(): void {
    this._enabled = !this._enabled;

    if (this.adapter) {
      this.adapter.setValue(this._enabled);
    }
  }

  getTitle() {
    return this._name;
  }

  hasOptions() {
    return false;
  }

  getIcon() {
    return this._icon;
  }

  isActive() {
    if (this.adapter) {
      return this.adapter.getValue();
    }

    return this._enabled;
  }
}

export class SettingsOptionsFeatureModel extends SettingsBaseFeatureModel {

  protected _options: Settings.IFeatureOption[];

  constructor(config: Settings.IFeatureConfig) {
    super(config);
    this._options = config.options;
  }

  protected _getSelectedOption(): Settings.IFeatureOption {
    return _.find(this._options, (o) => o.selected);
  }

  toggle() {}

  getTitle() {
    return this._getSelectedOption().name;
  }

  hasOptions() {
    return true;
  }

  getIcon() {
    return this._getSelectedOption().icon;
  }

  isActive() {
    return false;
  }

  setSelectedOption(option: Settings.IFeatureOption) {
    _.each(this._options, (o: Settings.IFeatureOption) => {
      o.selected = false;
    });

    option.selected = true;
  }

  getOptions(): Settings.IFeatureOption[] {
    return this._options;
  }
}

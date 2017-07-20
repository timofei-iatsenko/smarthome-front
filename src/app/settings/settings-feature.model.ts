import { Injectable } from '@angular/core';
import { Settings } from '../interfaces';
import { BackendProvider } from '../common/backend.provider';
import { SettingsProvider } from './settings.provider';

@Injectable()
export abstract class SettingsBaseFeatureModel {
  protected _key: string;
  inStatusBar: boolean;
  adapter: Settings.IAdapter;

  constructor(config: Settings.IFeatureConfig,
              protected backend: BackendProvider,
              protected settings: SettingsProvider) {
    this._key = config.key;
    this.inStatusBar = config.inStatusBar;

    if (typeof(config.adapter) === 'function') {
      this.adapter = new config.adapter(backend, settings);
    }
  }

  abstract getTitle(): string;

  abstract isActive(): boolean;

  abstract getIcon(): string;

  abstract hasOptions(): boolean;
}

export class SettingsToggleFeatureModel extends SettingsBaseFeatureModel {
  private icon: string;
  private name: string;
  private enabled: boolean;

  constructor(config: Settings.IFeatureConfig,
              protected backend: BackendProvider,
              protected settings: SettingsProvider) {
    super(config, backend, settings);

    this.icon = config.icon;
    this.name = config.name;
  }

  toggle(): void {
    if (this.adapter) {
      this.adapter.setValue(!this.adapter.getValue());
    } else {
      this.enabled = !this.enabled;
    }
  }

  getTitle() {
    return this.name;
  }

  hasOptions() {
    return false;
  }

  getIcon() {
    return this.icon;
  }

  isActive() {
    if (this.adapter) {
      return this.adapter.getValue();
    }

    return this.enabled;
  }
}

export class SettingsOptionsFeatureModel extends SettingsBaseFeatureModel {
  protected options: Settings.IFeatureOption[];

  constructor(config: Settings.IFeatureConfig,
              protected backend: BackendProvider,
              protected settings: SettingsProvider) {
    super(config, backend, settings);
    this.options = config.options;
  }

  protected getSelectedOption(): Settings.IFeatureOption {
    return this.options.find((o) => o.value === this.adapter.getValue());
  }

  toggle() {}

  getTitle() {
    return this.getSelectedOption().name;
  }

  hasOptions() {
    return true;
  }

  getIcon() {
    return this.getSelectedOption().icon;
  }

  isActive() {
    return false;
  }

  setSelectedOption(option: Settings.IFeatureOption) {
    this.adapter.setValue(option.value);
  }

  getOptions(): Settings.IFeatureOption[] {
    return this.options;
  }
}

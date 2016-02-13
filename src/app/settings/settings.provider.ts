import {Injectable} from 'angular2/core';
import {SETTINGS_FEATURES} from '../config';
import {Settings} from '../interfaces';
import {SettingsToggleFeatureModel, SettingsOptionsFeatureModel, SettingsBaseFeatureModel} from './settings-feature.model';
import {SimpleEvent} from '../libs/simple-event';

@Injectable()
export class SettingsProvider {

  onChange = new SimpleEvent();
  protected _features: SettingsBaseFeatureModel[];

  constructor() {
    this._features  = this.featuresFactory(SETTINGS_FEATURES);
  }

  featuresFactory(configs: Settings.IFeatureConfig[]): SettingsBaseFeatureModel[] {
    return _.map(configs, (c) => {
      if (c.type ===  Settings.IFeatureType.toggle) {
        return new SettingsToggleFeatureModel(c);
      }
      return new SettingsOptionsFeatureModel(c);
    });
  }

  get features(): SettingsBaseFeatureModel[] {
    return this._features;
  }


}

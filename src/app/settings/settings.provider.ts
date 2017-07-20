import { Injectable } from '@angular/core';
import { SETTINGS_FEATURES } from '../config';
import { Settings } from '../interfaces';
import {
  SettingsToggleFeatureModel,
  SettingsOptionsFeatureModel,
  SettingsBaseFeatureModel
} from './settings-feature.model';
import { SimpleEvent } from '../libs/simple-event';
import { BackendProvider } from '../common/backend.provider';

@Injectable()
export class SettingsProvider {
  onChange = new SimpleEvent();
  features: SettingsBaseFeatureModel[];

  constructor(private backend: BackendProvider) {
    this.features = this.featuresFactory(SETTINGS_FEATURES);
  }

  featuresFactory(configs: Settings.IFeatureConfig[]): SettingsBaseFeatureModel[] {
    return configs.map((c) => {
      if (c.type === Settings.IFeatureType.toggle) {
        return new SettingsToggleFeatureModel(c, this.backend, this);
      }
      return new SettingsOptionsFeatureModel(c, this.backend, this);
    });
  }
}

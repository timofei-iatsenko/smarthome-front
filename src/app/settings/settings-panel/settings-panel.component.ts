import { Component } from '@angular/core';
import { SettingsProvider } from '../settings.provider';
import { Settings } from '../../interfaces';
import { SettingsOptionsFeatureModel } from '../settings-feature.model';
import { SettingsToggleFeatureModel } from '../settings-feature.model';

@Component({
  selector: 'settings-panel',
  template: require('./settings-panel.tpl.jade')
})

export class SettingsPanelComponent {
  selectedFeature: SettingsOptionsFeatureModel;

  constructor(private settings: SettingsProvider) {}

  get features() {
    return this.settings.features;
  }

  toggleOptions(feature: SettingsOptionsFeatureModel) {
    // if the same feature, collapse bar (clear options)
    this.selectedFeature = this.selectedFeature === feature ? null : feature;
    this.settings.onChange.trigger();
  }

  toggleFeature(feature: SettingsToggleFeatureModel) {
    this.hideOptionsPanel();
    feature.toggle();

    this.settings.onChange.trigger();
  }

  hideOptionsPanel() {
    this.selectedFeature = null;
  }

  selectOption(option: Settings.IFeatureOption) {
    this.selectedFeature.setSelectedOption(option);
    this.hideOptionsPanel();
  }
}

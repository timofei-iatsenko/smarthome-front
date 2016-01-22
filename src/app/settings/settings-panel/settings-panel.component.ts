import {Component, Input, ElementRef} from 'angular2/core';
import {WavesDirective} from '../../common/directives/waves';
import {SettingsProvider} from '../settings.provider.ts';
import {XLinkDirective} from '../../directives/xlink.directive';


enum IFeatureType {
  toggle, options
}

interface IFeatureOption {
  icon: string;
  key: string;
  name: string;
  selected?: boolean;
}

interface ISettingsFeature {
  key: string;
  type: IFeatureType;
  options: IFeatureOption[];
  icon?: string;
  name?: string;
  enabled?: boolean;
}

const settingsFeatures = [
  {
    key: 'acFanSpeed',
    type: IFeatureType.options,
    options: [
      {
        icon: 'fan',
        key: 'min',
        name: 'Мин.'
      },
      {
        icon: 'fan',
        key: 'middle',
        name: 'Сред.'
      },
      {
        icon: 'fan',
        key: 'max',
        name: 'Макс.'
      },
      {
        icon: 'fan',
        key: 'max',
        name: 'Авто'
      },
    ],
  },
  {
    key: 'acMode',
    type: IFeatureType.options,
    options: [
      {
        icon: 'snowflake',
        key: 'cool',
        name: 'Охлаждение'
      },
      {
        icon: 'sun',
        key: 'heat',
        name: 'Обогрев'
      },
      {
        icon: 'water-drop',
        key: 'dry',
        name: 'Осушение'
      },
    ],
  },
  {
    icon: 'hood',
    key: 'hood',
    name: 'Выятяжка',
    type: IFeatureType.toggle,
  },
  {
    icon: 'input-air',
    key: 'inputAir',
    name: 'Приток',
    type: IFeatureType.toggle,
  },
];

@Component({
  selector: 'settings-panel',
  providers: [
    SettingsProvider
  ],
  directives: [
    WavesDirective,
    XLinkDirective
  ],
  template: require('./settings-panel.tpl.jade')
})
export class SettingsPanelComponent {

  options: IFeatureOption[];

  constructor(private settings: SettingsProvider) {

  }

  get features() {
    return settingsFeatures;
  }

  protected getSelectedOption(options: IFeatureOption[]) {
    let option = _.find(options, (o) => o.selected);
    if (!option) {
      option = options[0];
    }
    return option;
  }

  isFeatureActive(feature: ISettingsFeature) {
    if (feature.type === IFeatureType.options) {
      return false;
    }

    return feature.enabled;
  }

  getFeatureTitle(feature: ISettingsFeature) {
    if (feature.type === IFeatureType.options) {
      return this.getSelectedOption(feature.options).name;
    }

    return feature.name;
  }

  getFeatureIcon(feature: ISettingsFeature) {
    if (feature.type === IFeatureType.options) {
      return this.getSelectedOption(feature.options).icon;
    }

    return feature.icon;
  }

  featureToggle(feature: ISettingsFeature) {
    this.options = null;

    if (feature.type === IFeatureType.options) {
      this.options = feature.options;
    } else {
      feature.enabled =  !feature.enabled;
    }
  }

  selectOption(option: IFeatureOption) {
    _.each(this.options, (o: IFeatureOption) => {
      o.selected = false;
    });
    this.options = null;
    option.selected = true;
  }
}

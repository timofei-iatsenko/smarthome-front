import {ZoneConfig} from './zones/index';
import {Settings} from './interfaces';
import {SettingsHoodAdapter} from './settings/adapters/settings-hood-adapter';

export const BACKEND = {
  host: 'http://192.168.1.50',
};

export const ZONES : ZoneConfig[] = [
  {
    position: {
      left: '6%',
      top: '15%'
    },
    id: 0,
    title: 'Спальня Тима'
  },
  {
    position: {
      right: '5%',
      top: '15%'
    },
    id: 1,
    title: 'Спальня родители'
  },
  {
    position: {
      right: '5%',
      bottom: '20%'
    },
    id: 2,
    title: 'Кабинет'
  },
];

export const SETTINGS_FEATURES  : Settings.IFeatureConfig[] = [
  {
    key: 'acMode',
    inStatusBar: true,
    type: Settings.IFeatureType.options,
    adapter: '',
    options: [
      {
        icon: 'snowflake',
        key: 'cool',
        name: 'Охлаждение',
        selected: true,
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
    inStatusBar: true,
    key: 'hood',
    name: 'Вытяжка',
    adapter: SettingsHoodAdapter,
    type: Settings.IFeatureType.toggle,
  },
  {
    icon: 'input-air',
    inStatusBar: true,
    key: 'inputAir',
    name: 'Приток',
    adapter: '',
    type: Settings.IFeatureType.toggle,
  },
];

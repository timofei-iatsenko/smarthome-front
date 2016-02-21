import {Component, OnInit, OnDestroy} from 'angular2/core';
import {SettingsProvider} from '../../settings/settings.provider';
import {SettingsBaseFeatureModel} from '../../settings/settings-feature.model';
import {AcUnitProvider} from '../../common/ac-unit.provider';

@Component({
  selector: 'status-area',
  template: require('./status-area.tpl.jade')
})

export class StatusAreaComponent implements OnInit, OnDestroy {

  protected _items;
  protected _removeWatcherFn;

  constructor(private settings: SettingsProvider, private acUnit: AcUnitProvider) {
  }

  ngOnInit() {
    this._items =  this._fetchItems();

    this._removeWatcherFn = this.settings.onChange.bind(() => {
      this._items =  this._fetchItems();
    });
  }

  ngOnDestroy() {
    this._removeWatcherFn();
  }

  _fetchItems() {
    return _.filter(this.settings.features, (feature: SettingsBaseFeatureModel) => {
      return feature.inStatusBar && feature.isActive();
    });
  }

  get acEnabled() {
    return this.acUnit.enabled;
  }

  get items() {
    return this._items;
  }
}

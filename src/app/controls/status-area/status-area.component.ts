import {Component, Input, ElementRef, OnInit, OnDestroy} from 'angular2/core';
import {WavesDirective} from '../../common/directives/waves';
import {SettingsProvider} from '../../settings/settings.provider';
import {XLinkDirective} from '../../directives/xlink.directive';
import {SettingsBaseFeatureModel} from '../../settings/settings-feature.model';

@Component({
  selector: 'status-area',
  directives: [
    WavesDirective,
    XLinkDirective
  ],
  template: require('./status-area.tpl.jade')
})

export class StatusAreaComponent implements OnInit, OnDestroy {

  protected _items;
  protected _removeWatcherFn;

  constructor(private settings: SettingsProvider) {
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

  get items() {
    return this._items;
  }
}

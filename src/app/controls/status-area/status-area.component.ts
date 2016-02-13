import {Component, Input, ElementRef} from 'angular2/core';
import {WavesDirective} from '../../common/directives/waves';
import {SettingsProvider} from '../../settings/settings.provider';
import {XLinkDirective} from '../../directives/xlink.directive';
import {OnInit} from 'angular2/core';
import {OnDestroy} from "angular2/core";

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
    console.log(settings);
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
    return _.filter(this.settings.features, (feature: any) => {
      return feature.inStatusBar;
    });
  }


  get items() {
    return this._items;
  }
}

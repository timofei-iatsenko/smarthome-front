import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsProvider } from '../../settings/settings.provider';
import { SettingsBaseFeatureModel } from '../../settings/settings-feature.model';
import { AcUnitProvider } from '../../common/ac-unit.provider';
import template from './status-area.tpl.jade';

@Component({
  selector: 'status-area',
  template
})

export class StatusAreaComponent implements OnInit, OnDestroy {

  public items;
  protected removeWatcherFn;

  constructor(private settings: SettingsProvider, private acUnit: AcUnitProvider) {}

  ngOnInit() {
    this.items = this.fetchItems();

    this.removeWatcherFn = this.settings.onChange.bind(() => {
      this.items = this.fetchItems();
    });
  }

  ngOnDestroy() {
    this.removeWatcherFn();
  }

  private fetchItems() {
    return this.settings.features.filter((feature: SettingsBaseFeatureModel) => {
      return feature.inStatusBar && feature.isActive();
    });
  }

  get acEnabled() {
    return this.acUnit.enabled;
  }
}

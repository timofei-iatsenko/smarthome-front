import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../../settings/settings.service';
import { SettingsBaseFeatureModel } from '../../settings/settings-feature.model';
import { AcUnitProvider } from '../../common/ac-unit.provider';

@Component({
  selector: 'status-area',
  templateUrl: 'status-area.html',
  styleUrls: ['status-area.scss'],
})

export class StatusAreaComponent implements OnInit, OnDestroy {
  public items;
  private removeWatcherFn;

  constructor(
    private settings: SettingsService,
    private acUnit: AcUnitProvider,
  ) {}

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

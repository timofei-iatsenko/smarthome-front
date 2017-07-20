import { Injectable } from '@angular/core';
import { ITempControllable } from '../../interfaces';
import { ZonesStoreProvider } from '../../zones/zones-store.provider';
import { ZoneModel } from '../../zones/zone.model';
import { TEMP_STEP } from '../../config';
import { CommonTemperature } from './common-temperature';

@Injectable()
export class TempControlProvider {
  private commonTemp: CommonTemperature;
  public nativeElement: Element;

  constructor(private zonesStore: ZonesStoreProvider) {
    this.commonTemp = new CommonTemperature(zonesStore.items);
  }

  get currentTarget(): ITempControllable {
      return this.zonesStore.selected || this.commonTemp;
  }

  isCommonMode() {
    return !this.zonesStore.selected;
  }
}

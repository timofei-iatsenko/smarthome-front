import { Injectable } from '@angular/core';
import { ZoneModel } from './zone.model';

@Injectable()
export class ZonesStoreProvider {
  public items: ZoneModel[] = [];

  add(zone: ZoneModel) {
    this.items.push(zone);
  }

  get selected(): ZoneModel {
    return this.items.find((item) => item.selected);
  }

  filter(predicate: (ZoneModel) => boolean): ZoneModel[] {
    return this.items.filter(predicate);
  }

  getById(id: number): ZoneModel {
    return this.items.find((item) => item.id === id);
  }
}

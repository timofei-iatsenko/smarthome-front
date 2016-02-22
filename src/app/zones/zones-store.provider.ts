import {Injectable} from 'angular2/core';
import {ZoneModel} from './zone.model.ts';

@Injectable()
export class ZonesStoreProvider {
  protected _items: Array<ZoneModel> = [];

  add(zone: ZoneModel) {
    this._items.push(zone);
  }

  get items() {
    return this._items;
  }

  get selected(): ZoneModel {
    return _.find(this._items, (item) => {
      return item.selected;
    });
  }

  filter(predicate: (ZoneModel) => boolean): ZoneModel[] {
    return _.filter(this._items, predicate);
  }

  getById(id: number): ZoneModel  {
    return _.find(this._items, (item) => {
      return item.id == id;
    });
  }

}

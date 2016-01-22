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

  getById(id: number) {
    console.log({id});
    return _.find(this._items, (item) => {
      return item.id == id;
    });
  }

}

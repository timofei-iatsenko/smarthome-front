import {Directive, Component, ElementRef, Renderer, Input} from 'angular2/core';
import {ZonesStoreProvider} from '../zones/zones-store.provider.ts';
import {TempControlProvider} from '../controls/temp-control/temp-control.provider.ts';

const directives: ZoneDirective[] = [];
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Directive({
  selector: '[zone-id]', // using [ ] means selecting attributes
  host: {
    '(click)': 'onClick()',
  }
})
export class ZoneDirective {
  @Input('zone-id') zoneId: number;

  constructor(private zones: ZonesStoreProvider, private element: ElementRef, private tempControl: TempControlProvider) {
    directives.push(this);
  }

  get selected(): boolean {
    return this.zoneModel.selected;
  }

  set selected(value: boolean){
    this.zoneModel.selected = value;
  }

  get zoneModel() {
    return this.zones.getById(this.zoneId);
  }

  select() {
    this.tempControl.setZone(this.zoneModel);
    this.selected = true;
    this.element.nativeElement.classList.add('selected');
  }

  clear() {
    this.tempControl.setCommon();
    this.selected = false;
    this.element.nativeElement.classList.remove('selected');
  }

  triggerSelection() {
    this.selected ? this.clear() : this.select();
  }

  onClick() {
    _.each(directives,  (instance) => {
      if (instance !== this) {
        instance.clear();
      }
    });

    this.triggerSelection();
  }

  ngAfterViewInit() {
    jQuery(document).on('mouseup', this._clickOutsideHandler.bind(this));
  }

  ngOnDestroy() {
    jQuery(document).off('mouseup', this._clickOutsideHandler.bind(this));
  }

  private _clickOutsideHandler(e) {
    if (this.selected) {
      const $tempControl = jQuery(this.tempControl.nativeElement);
      const $element = jQuery(this.element.nativeElement);
      if (!$element.is(e.target) && $element.has(e.target).length === 0 && $tempControl.has(e.target).length == 0) {
        this.clear();
      }
    }
  }
}

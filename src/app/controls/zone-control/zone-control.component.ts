import {Component, Input, ElementRef} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {WavesDirective} from '../../common/directives/waves';
import {ZoneModel} from '../../zones/zone.model.ts';
//import jQuery = require('jquery');

var jQuery: JQueryStatic = require('jquery');

@Component({
  selector: 'zone-control',
  directives: [
    WavesDirective
  ],
  template: require('./zone-control.tpl.jade')
})
export class ZoneControlComponent {
  public expanded = false;

  @Input() zone: ZoneModel;

  constructor(private element: ElementRef) {

  }

  show() {
    this.expanded = true;
  }

  hide() {
    this.expanded = false;
  }

  toggle() {
    this.expanded ? this.hide() : this.show();
  }

  toggleSync() {
    this.zone.sync =  !this.zone.sync;
    this.hide();
  }

  toggleEnabled() {
    this.zone.toggleEnabled();
    this.hide();
  }

  ngAfterViewInit() {
    jQuery(document).on('mouseup', this._clickOutsideHandler.bind(this));
  }

  ngOnDestroy() {
    jQuery(document).off('mouseup', this._clickOutsideHandler.bind(this));
  }

  private _clickOutsideHandler(e) {
    const $element = jQuery(this.element.nativeElement);
    if (!$element.is(e.target) && $element.has(e.target).length === 0) {
      this.hide();
    }
  }
}

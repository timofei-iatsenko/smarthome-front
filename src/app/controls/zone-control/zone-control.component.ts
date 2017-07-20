import { Component, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ZoneModel } from '../../zones/zone.model';

@Component({
  selector: 'zone-control',
  template: require('./zone-control.tpl.jade')
})
export class ZoneControlComponent implements AfterViewInit, OnDestroy {
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
    this.zone.sync = !this.zone.sync;
    this.hide();
  }

  toggleEnabled() {
    this.zone.toggleEnabled();
    this.hide();
  }

  ngAfterViewInit() {
    document.addEventListener('mouseup', this.clickOutsideHandler.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('mouseup', this.clickOutsideHandler.bind(this));
  }

  private clickOutsideHandler(e: MouseEvent) {
    const element: Element = this.element.nativeElement;

    if (element !== e.target && !element.contains(e.target as Element)) {
      this.hide();
    }
  }
}

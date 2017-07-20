import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { ZonesStoreProvider } from '../zones/zones-store.provider';
import { TempControlProvider } from '../controls/temp-control/temp-control.provider';

const directives: ZoneDirective[] = [];

@Directive({
  selector: '[zone-id]',
})

export class ZoneDirective implements AfterViewInit, OnDestroy {
  @Input('zone-id') zoneId: string;

  constructor(private zones: ZonesStoreProvider,
              private element: ElementRef,
              private tempControl: TempControlProvider) {
    directives.push(this);
  }

  get selected(): boolean {
    return this.zoneModel.selected;
  }

  set selected(value: boolean) {
    this.zoneModel.selected = value;
  }

  get zoneModel() {
    return this.zones.getById(+this.zoneId);
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

  @HostListener('click')
  handleClick() {
    directives.forEach((instance) => {
      if (instance !== this) {
        instance.clear();
      }
    });

    this.triggerSelection();
  }

  ngAfterViewInit() {
    document.addEventListener('mouseup', this.clickOutsideHandler.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('mouseup', this.clickOutsideHandler.bind(this));
  }

  private clickOutsideHandler(e: MouseEvent) {
    if (!this.selected) {
      return;
    }

    const element: Element = this.element.nativeElement;
    const tempControl: Element = this.tempControl.nativeElement;

    if (element !== e.target && !element.contains(e.target as Element) && !tempControl.contains(e.target as Element)) {
      this.clear();
    }
  }
}

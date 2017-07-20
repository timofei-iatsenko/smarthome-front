import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[xlink]',
})
export class XLinkDirective implements OnChanges {
  @Input('xlink') link: string;

  constructor(private element: ElementRef) {}

  ngOnChanges(changes) {
    this.element.nativeElement.setAttribute('xlink:href', changes.link.currentValue);
  }
}

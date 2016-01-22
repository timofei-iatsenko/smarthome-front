import {Directive, Component, ElementRef, Renderer, Input, OnChanges} from 'angular2/core';
import {SimpleChange} from 'angular2/core';

@Directive({
  selector: '[xlink]',
})
export class XLinkDirective implements OnChanges {
  @Input('xlink') link: string;

  constructor(private element: ElementRef) {

  }

  ngOnChanges(changes) {
    jQuery(this.element.nativeElement).attr('xlink:href', changes.link.currentValue);
  }

}

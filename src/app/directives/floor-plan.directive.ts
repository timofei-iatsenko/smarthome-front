import {Directive, Component, ElementRef, Renderer} from 'angular2/core';
var jQuery: JQueryStatic = require('jquery');
var _ = require('lodash');

/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Directive({
  selector: '.floor-plan' // using [ ] means selecting attributes
})
export class FloorPlanDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    // element.nativeElement.style.fontSize = 'x-large';

    //const $element = jQuery(element.nativeElement);
    //_.each($element.find('path.zone'), (el) => {
    //  const $zone = jQuery(el);
    //  if ($zone.data('zone-id'))
    //});

    console.log();
    // for server/webworker support use the renderer
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}

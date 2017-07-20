import { Directive, Component, ElementRef, Renderer } from '@angular/core';
import Waves from 'node-waves';

let inited = false;

@Directive({
  selector: '[waves]'
})

export class WavesDirective {
  constructor(element: ElementRef) {
    if (!inited) {
      Waves.init();
      inited = true;
    }

    Waves.attach(element.nativeElement);
  }
}

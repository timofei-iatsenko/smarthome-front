import { Directive, ElementRef } from '@angular/core';
import * as Waves from 'node-waves';

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

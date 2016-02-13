import {Component, Input, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {WavesDirective} from '../../common/directives/waves';
import {TempControlProvider} from './temp-control.provider';


@Component({
  selector: 'temp-control',
  directives: [
    WavesDirective,
  ],
  template: require('./temp-control.tpl.jade')
})

export class TempControlComponent {

  constructor(private service: TempControlProvider, element: ElementRef) {
    service.nativeElement = element.nativeElement;
  }

  get isZoned(){
    return !this.service.isCommonMode();
  }

  get value() {
    return this.service.currentTarget.tempSetpoint;
  }

  increase() {
    this.service.currentTarget.incrementTemp();
  }

  decrease() {
    this.service.currentTarget.decrementTemp();
  }
}

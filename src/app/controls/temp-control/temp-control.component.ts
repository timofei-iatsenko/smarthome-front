import { Component, ElementRef } from '@angular/core';
import { TempControlProvider } from './temp-control.provider';

@Component({
  selector: 'temp-control',
  templateUrl: 'temp-control.html',
  styleUrls: ['temp-control.scss'],
})

export class TempControlComponent {

  constructor(private service: TempControlProvider, element: ElementRef) {
    service.nativeElement = element.nativeElement;
  }

  get isZoned() {
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

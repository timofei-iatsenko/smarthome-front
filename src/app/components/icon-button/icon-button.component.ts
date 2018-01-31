import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-button',
  template: `
    <button type="button" waves
            class="waves-circle waves-light"
            [class.active] = 'active'
            [inlineSVG]="'/assets/icon/' + icon + '.svg'">
  </button>`,
  styleUrls: ['./icon-button.scss'],
})
export class ButtonComponent {
  @Input() public icon: string;
  @Input() public active: boolean;
  @Input() public wavesLight: boolean;
}

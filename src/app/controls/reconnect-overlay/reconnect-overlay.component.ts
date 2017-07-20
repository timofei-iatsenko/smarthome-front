import { Component } from '@angular/core';
import { BackendProvider } from '../../common/backend.provider';
import template from './reconnect-overlay.tpl.jade';

@Component({
  selector: 'reconnect-overlay',
  template
})

export class ReconnectOverlayComponent {
  constructor(private backend: BackendProvider) {}

  get visible() {
    return !this.backend.connected;
  }
}

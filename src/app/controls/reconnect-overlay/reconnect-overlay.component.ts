import {Component, OnInit, OnDestroy} from 'angular2/core';
import {BackendProvider} from '../../common/backend.provider';

@Component({
  selector: 'reconnect-overlay',
  template: require('./reconnect-overlay.tpl.jade')
})
export class ReconnectOverlayComponent {

  constructor(private backend: BackendProvider) {
  }

  get visible() {
    return !this.backend.connected;
  }
}

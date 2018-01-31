import { Component } from '@angular/core';
import { BackendProvider } from '../../common/backend.provider';

@Component({
  selector: 'reconnect-overlay',
  templateUrl: 'reconnect-overlay.html',
  styleUrls: ['reconnect-overlay.scss']
})

export class ReconnectOverlayComponent {
  constructor(private backend: BackendProvider) {}

  get visible() {
    return !this.backend.connected;
  }
}

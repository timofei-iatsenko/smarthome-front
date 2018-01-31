import { Component } from '@angular/core';
import { BackendService } from '../../common/backend/backend.service';

@Component({
  selector: 'reconnect-overlay',
  templateUrl: 'reconnect-overlay.html',
  styleUrls: ['reconnect-overlay.scss']
})

export class ReconnectOverlayComponent {
  constructor(private backend: BackendService) {}

  get visible() {
    return !this.backend.connected;
  }
}

import { ISettingsAdapter } from './settings-adapter.interface';
import { BackendService } from '../../common/backend/backend.service';
import { SettingsService } from '../settings.service';

export class SettingsExhaustFanAdapter implements ISettingsAdapter {
  private enabled = false;

  constructor(
    private backend: BackendService,
    private settings: SettingsService,
  ) {
    backend.onData.bind((data) => {
      this.enabled = data.exhaustFanEnabled;
      settings.onChange.trigger();
    });
  }

  setValue(value: boolean) {
    this.backend.socket.emit('changeExhaustFanStatus', value);
    this.enabled = value;
  }

  getValue(): boolean {
    return this.enabled;
  }
}

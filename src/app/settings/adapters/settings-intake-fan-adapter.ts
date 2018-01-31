import { ISettingsAdapter } from './settings-adapter.interface';
import { BackendService } from '../../common/backend/backend.service';
import { SettingsService } from '../settings.service';

export class SettingsIntakeFanAdapter implements ISettingsAdapter {
  private enabled = false;

  constructor(
    private backend: BackendService,
    private settings: SettingsService,
  ) {
    backend.onData.bind((data) => {
      this.enabled = data.intakeFanEnabled;
      settings.onChange.trigger();
    });
  }

  setValue(value: boolean) {
    this.backend.socket.emit('changeIntakeFan', value);
    this.enabled = value;
  }

  getValue(): boolean {
    return this.enabled;
  }
}

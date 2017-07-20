import { ISettingsAdapter } from './settings-adapter.interface';
import { BackendProvider } from '../../common/backend.provider';
import { SettingsProvider } from '../settings.provider';

export class SettingsExhaustFanAdapter implements ISettingsAdapter {
  private enabled = false;

  constructor(private backend: BackendProvider, private settings: SettingsProvider) {
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

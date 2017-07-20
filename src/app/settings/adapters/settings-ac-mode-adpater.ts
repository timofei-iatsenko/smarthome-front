import { ISettingsAdapter } from './settings-adapter.interface';
import { Backend, BackendProvider } from '../../common/backend.provider';
import { SettingsProvider } from '../settings.provider';

export class SettingsAcModeAdapter implements ISettingsAdapter {
  private mode = Backend.AcUnitMode.COOL;

  constructor(private backend: BackendProvider, private settings: SettingsProvider) {
   this.init();
  }

  init() {
    this.backend.onData.bind((data) => {
      this.mode = data.acUnit.mode;
      this.settings.onChange.trigger();
    });
  }

  setValue(value: number) {
    this.backend.socket.emit('changeAcMode', value);
    this.mode = value;
  }

  getValue(): number {
    return this.mode || Backend.AcUnitMode.COOL;
  }
}

import { AcUnitMode } from '../../common/backend/ac-unit';
import { ISettingsAdapter } from './settings-adapter.interface';
import { BackendService } from '../../common/backend/backend.service';
import { SettingsService } from '../settings.service';

export class SettingsAcModeAdapter implements ISettingsAdapter {
  private mode = AcUnitMode.COOL;

  constructor(
    private backend: BackendService,
    private settings: SettingsService
  ) {
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
    return this.mode || AcUnitMode.COOL;
  }
}

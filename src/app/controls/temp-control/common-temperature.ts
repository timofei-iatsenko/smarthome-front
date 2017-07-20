import { ITempControllable } from '../../interfaces';
import { ZoneModel } from '../../zones/zone.model';
import { TEMP_STEP } from '../../config';

const DEFAULT_SETPOINT = 24;

export class CommonTemperature implements ITempControllable {
  protected setpoint: number;

  constructor(private zones: ZoneModel[]) {
    this.setpoint = zones.length ? zones[0].tempSetpoint : DEFAULT_SETPOINT;
    this.bindEvents();
  }

  incrementTemp() {
    this.setpoint = this.setpoint + TEMP_STEP;
    this.updateZones();
  }

  decrementTemp() {
    this.setpoint = this.setpoint - TEMP_STEP;
    this.updateZones();
  }

  get tempSetpoint() {
    return this.setpoint;
  }

  private updateZones() {
    this.zones
      .filter((zone) => zone.sync)
      .forEach((zone: ZoneModel) => {
        zone.tempSetpoint = this.setpoint;
      });
  }

  private bindEvents() {
    this.zones.forEach((zone: ZoneModel) => {
      zone.onChanged.bind(() => {
        if (zone.sync) {
          zone.tempSetpoint = this.setpoint;
        }
      });
    });
  }
}

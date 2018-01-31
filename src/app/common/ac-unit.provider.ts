import { AcUnit, AcUnitMode } from './backend/ac-unit';
import { Injectable } from '@angular/core';

@Injectable()
export class AcUnitProvider {
  ambientTemp: number;
  enabled: boolean;
  fanSpeed: number;
  tempSetpoint: number;
  unitMode: AcUnitMode;

  setData(data: AcUnit) {
    Object.assign(this, data);
  }
}

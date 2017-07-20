import { Backend } from './backend.provider';
import { Injectable } from '@angular/core';

@Injectable()
export class AcUnitProvider {
  ambientTemp: number;
  enabled: boolean;
  fanSpeed: number;
  tempSetpoint: number;
  unitMode: Backend.AcUnitMode;
}

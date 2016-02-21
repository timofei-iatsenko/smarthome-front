import {Backend, BackendProvider} from './backend.provider';
import {Injectable} from 'angular2/core';

@Injectable()
export class AcUnitProvider {
  ambientTemp: number;
  enabled: boolean;
  fanSpeed: number;
  tempSetpoint: number;
  unitMode: Backend.AcUnitMode;
}



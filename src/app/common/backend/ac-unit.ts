export enum AcUnitMode {
  AUTO = 0,
  HEAT = 1,
  DRY = 2,
  FAN = 3,
  COOL = 4,
}

export interface AcUnit {
  ambientTemp: number;
  enabled: boolean;
  fanSpeed: number;
  tempSetpoint: number;
  mode: AcUnitMode;
}

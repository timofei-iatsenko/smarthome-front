enum FanSpeed {
  Max, Middle, Min
}

enum AcMode {
  Cool, Heat, Dry, Auto
}

export class SettingsModel {

  // public acFanSpeed: FanSpeed = FanSpeed.Middle;
  public acMode: AcMode = AcMode.Cool;
  public hoodEnabled: boolean;
  public airInputEnabled: boolean;

  constructor() {

  }
}

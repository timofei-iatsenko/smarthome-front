export interface ControlPosition {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export interface ZoneConfig {
  position: ControlPosition;
  id: number;
  title: string;
}

class WebpackTrackEnabler {
}

export interface ITempControllable {
  tempSetpoint: number;
  incrementTemp();
  decrementTemp();
}

export module Settings {
  export interface IAdapter {
    setValue(value: any);
    getValue(): any;
  }


  export enum IFeatureType {
    toggle, options
  }

  export interface IFeatureOption {
    icon: string;
    value: any;
    name: string;
    selected?: boolean;
  }

  export interface IFeatureConfig {
    key: string;
    type: IFeatureType;
    options?: IFeatureOption[];
    icon?: string;
    name?: string;
    enabled?: boolean;
    inStatusBar: boolean;
    adapter: any;
  }
}

declare module "tom-select" {
  export interface TomSettings {
    closeAfterSelect?: boolean;
    [key: string]: any;
  }

  export default class TomSelect {
    constructor(selector: string | HTMLElement, options?: Partial<TomSettings>);
    setValue(value: any): void;
    addOption(data: any): void;
    removeOption(value: any): void;
    destroy(): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    [key: string]: any;
  }
}

declare module "tom-select/src/getSettings" {
  import { TomSettings } from "tom-select";
  export default function getSettings(
    settings: Partial<TomSettings>,
  ): TomSettings;
}

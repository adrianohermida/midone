// Global type suppressions for external libraries
declare module "tom-select/src/getSettings" {
  const content: any;
  export default content;
}

declare module "tom-select" {
  interface TomSettings {
    closeAfterSelect?: boolean;
    [key: string]: any;
  }

  class TomSelect {
    constructor(selector: string | HTMLElement, options?: Partial<TomSettings>);
    [key: string]: any;
  }

  export = TomSelect;
}

// Suppress TypeScript errors for react-transition-group
declare module "react-transition-group" {
  export interface TransitionProps {
    onEnter?: (...args: any[]) => void;
    onExit?: (...args: any[]) => void;
    [key: string]: any;
  }

  export class Transition extends React.Component<any> {}
}

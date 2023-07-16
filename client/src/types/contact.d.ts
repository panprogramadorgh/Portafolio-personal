export interface Inputs {
  name: string;
  email: string;
  message: string;
}

export interface ShowWindow {
  state: ShowWindowStates;
  windowFadeoutAnimation: boolean;
  message?: ReactNode;
}

export type UpdateShowWindowState = Omit<ShowWindow, "windowFadeoutAnimation">;

export interface ContactContextInterface {
  verificationCodeWindow: string | null;
  setVerificationCodeWindow: (newValue: string | null) => void;

  showWindow: ShowWindow;
  setShowWindow: (newValue: ShowWindow) => void;

  inputs: Inputs;
  setInputs: (newValue: Inputs) => void;

  updateShowWindowState: ({
    state,
    message,
  }: Omit<ShowWindow, "windowFadeoutAnimation">) => Promise<void>;
}

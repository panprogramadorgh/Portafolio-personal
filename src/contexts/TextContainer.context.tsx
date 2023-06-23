import { useState, createContext, ReactNode } from "react";

export type TextContainerContextValue = {
  showTextContainer: boolean;
  setShowTextContainer: (newValue: boolean) => void;
};
export const TextContainerContext =
  createContext<TextContainerContextValue | null>(null);

interface Props {
  children: ReactNode;
}
const TextContainerContextProvider = ({ children }: Props) => {
  const [showTextContainer, setShowTextContainer] = useState<boolean>(false);
  return (
    <TextContainerContext.Provider
      value={{
        showTextContainer,
        setShowTextContainer,
      }}
    >
      {children}
    </TextContainerContext.Provider>
  );
};

export default TextContainerContextProvider;

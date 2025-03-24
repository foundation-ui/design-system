import React from "react";
import { IDesignTokensLibrary, IDesignTokensSet } from "../../../../types";
import { js_design_tokens } from "../";

export const DesignTokensContext = React.createContext<null | {
  designTokens: IDesignTokensSet;
  setDesignTokensLibrary: React.Dispatch<
    React.SetStateAction<IDesignTokensLibrary>
  >;
}>(null);
export const useDesignTokens = () => React.useContext(DesignTokensContext);
export const DesignTokensProvider = ({
  tokenLibrary,
  children,
}: {
  tokenLibrary: IDesignTokensLibrary;
  children: React.ReactNode;
}) => {
  const [designTokensLibrary, setDesignTokensLibrary] =
    React.useState<IDesignTokensLibrary>(tokenLibrary || js_design_tokens);

  return (
    <DesignTokensContext.Provider
      value={{
        designTokens: { ...designTokensLibrary.design_tokens },
        setDesignTokensLibrary,
      }}
    >
      {children}
    </DesignTokensContext.Provider>
  );
};

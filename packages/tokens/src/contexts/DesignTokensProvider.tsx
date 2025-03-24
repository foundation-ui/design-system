import React from "react";
import { IDesignTokensLibrary } from "../../../../types";
import { js_design_tokens } from "../";

export const DesignTokensContext = React.createContext<null | unknown>({});
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
        ...designTokensLibrary.design_tokens,
        setDesignTokensLibrary,
      }}
    >
      {children}
    </DesignTokensContext.Provider>
  );
};

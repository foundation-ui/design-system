import React from "react";
import { IDesignTokensLibrary } from "../../../../types";
import { js_design_tokens } from "../";

export const DesignTokensContext = React.createContext<null | any>({});
export const useDesignTokens = () => React.useContext(DesignTokensContext);
export const DesignTokensProvider = ({ tokenLibrary, children }: any) => {
  const [designTokensLibrary, setDesignTokensLibrary] =
    React.useState<IDesignTokensLibrary>(tokenLibrary ?? js_design_tokens);

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

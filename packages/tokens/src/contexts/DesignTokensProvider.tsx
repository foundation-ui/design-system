import React, { createContext } from "react";
import { IDesignTokensLibrary } from "../../../../types";
import { js_design_tokens } from "..";

export const DesignTokensContext = createContext<null | any>(null);
export const DesignTokensProvider = ({ tokenLibrary, children }: any) => {
  const [designTokensLibrary, setDesignTokensLibrary] =
    React.useState<IDesignTokensLibrary>(tokenLibrary || js_design_tokens);

  return (
    <DesignTokensContext.Provider
      value={{
        library: designTokensLibrary,
        colors: designTokensLibrary.design_tokens.color,
        font_sizes: designTokensLibrary.design_tokens.fontsize,
        measurements: designTokensLibrary.design_tokens.measurement,
        setDesignTokensLibrary,
      }}
    >
      {children}
    </DesignTokensContext.Provider>
  );
};

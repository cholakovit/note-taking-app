import { createContext, useContext } from "react";

export const ColorModeContext = createContext<ColorModeContextValue>({
  toggleColorMode: () => {}
});

export const useColorMode = () => useContext(ColorModeContext);
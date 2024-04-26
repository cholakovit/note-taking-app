
import { useMemo, useState } from 'react';
import './App.css'
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { DARK, LIGHT } from './helper/constants';
import { useWeatherTheme } from './helper/hooks';
import { ColorModeContext } from './helper/context';
import Header from './components/Header';
import { RouterProvider } from 'react-router-dom';
import { router } from './helper/noteRouter';
function App() {

  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode: ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT));
      },
    }),
    []
  );
    
  // dynamically creates and memoizes a Material-UI theme based on the provided mode (light or dark), adjusting colors, backgrounds, and other style 
  // properties accordingly to switch between light and dark themes.
  const theme = useWeatherTheme(mode);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App

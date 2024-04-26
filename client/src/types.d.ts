
type Note = {
  _id?: string
  title: string
  description: string
  tags: string
  createdAt?: string
}

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    black?: string;
    fourth?: string; 
    white?: string;
  }

  type Palette = {
    primary: PaletteColor;
  }

  // Merge the Palette interface with the Theme interface
  interface Theme extends Palette {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      up: (key: number | string) => string;
      down: (key: number | string) => string;
      between: (start: number | string, end: number | string) => string;
      only: (key: number | string) => string;
      width: (key: number | string) => number;
    };
  }

  type ThemeOptions = {
    palette?: PaletteOptions;
  }
}

type ColorModeContextType = {
  toggleColorMode: () => void;
}

type ColorModeContextValue = {
  toggleColorMode: () => void;
}

type CustomPalette = {
  primary: {
    main: string;
    black: string;
    white: string;
    iconColor: string;
  };
  mode: PaletteMode;
}

type NoteProps = {
  note: Note;
  onDelete: (id: string) => void;
}

type SkeletonProps = {
  flag: number;
  width: number;
  height: number;
  number: number;
};

type AlertMessageProps = {
  alert: string | null;
  type: AlertColor;
}

type AlertWithTimeoutHookProps = {
  initialAlert: string | null
  timeout: number
}
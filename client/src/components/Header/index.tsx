// MUI Elements
import { useContext } from "react";
import {
  MaterialUISwitch,
  NoteFormControlLabel,
  NoteAppBar,
  HeaderContainer,
} from "./index.style";
import { ColorModeContext } from "../../helper/context";

const Header = () => {
  const colorMode = useContext(ColorModeContext) || {};
  return (
    <NoteAppBar>
      <HeaderContainer>
        <NoteFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="material-ui-switch"
        />
      </HeaderContainer>
    </NoteAppBar>
  );
};

export default Header;

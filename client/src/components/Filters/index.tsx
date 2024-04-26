import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchFilter } from "../../helper/hooks";
import { paperStyles } from "./index.style";

const Filters = () => {
  // manages search input state and interaction | updates a global store and invalidates relevant data
  const { search, setSearch, handleSubmit, handleClear } = useSearchFilter();

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={paperStyles}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Note Tags"
        inputProps={{ "aria-label": "search google maps" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={handleClear} sx={{ p: "10px" }} aria-label="clear">
        <ClearIcon />
      </IconButton>
    </Paper>
  );
};

export default Filters;

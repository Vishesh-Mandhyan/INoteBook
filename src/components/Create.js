import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[900],
    },
  },
});

export const create = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h6" component="p" color="secondary">
          create
        </Typography>
        <Button variant="outlined">Outlined</Button>
        <IconButton aria-label="delete" disabled color="secondary">
          <DeleteIcon />
        </IconButton>
      </ThemeProvider>
    </>
  );
};
export default create;

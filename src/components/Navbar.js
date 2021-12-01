import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";

export default function ButtonAppBar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button disableElevation href="/" variant="text">
            InoteBook
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            {!localStorage.getItem("token") ? (
              <form>
                <Button sx={{ mr: 2 }} variant="contained" href="/login">
                  log in
                </Button>
                <Button sx={{ mr: 2 }} variant="contained" href="/signup">
                  sign up
                </Button>
              </form>
            ) : (
              <Button sx={{ mr: 2 }} variant="contained" onClick={handleLogout}>
                log out
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

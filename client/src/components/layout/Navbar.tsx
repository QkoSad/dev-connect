import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../reducers/auth";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

const linkStyle = { color: "inherit", textDecoration: "none" };

const Navbar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const authLinks = [
    {
      id: 1,
      to: "/profiles",
      message: "Developers",
    },
    {
      id: 2,
      to: "/posts",
      message: "Posts",
    },
    {
      id: 3,
      to: "/dashboard",
      message: "Profile",
    },
  ];
  const guestLinks = [
    {
      id: 1,
      to: "/profiles",
      message: "Developers",
    },
    {
      id: 2,
      to: "/register",
      message: "Register",
    },
    {
      id: 3,
      to: "/login",
      message: "Login",
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Icon for big dislay*/}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          {/*LOGO link for bi display*/}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link}
            to="/posts"
          >
            DevConnect
          </Typography>
          {/* Small display menu*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            {/* Small display button */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* The actual menu that pops when you click the button */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated ? (
                <>
                  {" "}
                  {authLinks.map((el) => (
                    <MenuItem
                      component={Link}
                      to={el.to}
                      onClick={handleCloseNavMenu}
                      key={el.id}
                    >
                      {el.message}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleCloseNavMenu} key={4}>
                    <a
                      style={linkStyle}
                      onClick={() => dispatch(logOut())}
                      href="#!"
                    >
                      Logout
                    </a>
                  </MenuItem>
                  ,
                </>
              ) : (
                guestLinks.map((el) => (
                  <MenuItem
                    component={Link}
                    to={el.to}
                    onClick={handleCloseNavMenu}
                    key={el.id}
                  >
                    {el.message}
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
          {/* Icon for small display */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/* LOGO text link small display*/}
          <Typography
            variant="h5"
            noWrap
            component="h5"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link style={linkStyle} to={"/posts"}>
              DevConnect
            </Link>
          </Typography>
          {/* Menu bar for big display*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ? (
              <>
                {authLinks.map((el) => (
                  <Button
                    key={el.id}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    to={el.to}
                  >
                    {el.message}
                  </Button>
                ))}
                <Button
                  key={4}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => dispatch(logOut())}
                  href="#!"
                >
                  Logout
                </Button>
              </>
            ) : (
              guestLinks.map((el) => (
                <Button
                  key={el.id}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={el.to}
                >
                  {el.message}
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

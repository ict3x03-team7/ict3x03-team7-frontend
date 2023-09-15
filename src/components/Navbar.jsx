import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logoImage from "../assets/SITLogo.png";

const navbarStyle = {
  backgroundColor: "white", // White background color
  color: "black", // Black text color
  position: "fixed", // Sticky position
  top: "0", // Stick to the top of the viewport
  zIndex: "1000", // Set the z-index to ensure it's above other elements
};

const logoStyle = {
  maxHeight: "70px", // Adjust the logo size
};

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" style={navbarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logoImage} alt="Logo" style={logoStyle} />
          </Typography>

          <Link to="/Recipes" style={{ color: "black" }}>
            <Button color="inherit">My Recipes</Button>
          </Link>

          <Link to="/Dashboard" style={{ color: "black" }}>
            <Button color="inherit">Admin Dashboard</Button>
          </Link>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
            style={{ marginTop: "0px" }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to="/Profile"
                style={{ color: "black", textDecoration: "none" }}
              >
                My Profile
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link
                to="/Logout"
                style={{ color: "black", textDecoration: "none" }}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

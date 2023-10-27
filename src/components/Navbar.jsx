import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  const gotoProfile = async () => {
    // navigate("/Profile");

    try {
      const response = await axios.get(
        "http://localhost:8085/api/v1/auth/userID",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userID = response.data.result;
        console.log("User ID:", userID);

        navigate("/Profile", { state: { userID } });
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8085/api/v1/auth/logout", null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // Successful logout
          console.log("Logout successful:", response.data);
        } else {
          console.log("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div>
      <AppBar position="fixed" style={navbarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logoImage} alt="Logo" style={logoStyle} />
          </Typography>

          {/* {isLoggedIn && ( */}
          <Link to="/Recipes" style={{ color: "black" }}>
            <Button color="inherit">Search Recipe</Button>
          </Link>
          {/* )} */}

          {/* {isLoggedIn && ( */}
          <Link to="/Dashboard" style={{ color: "black" }}>
            <Button color="inherit">Admin Dashboard</Button>
          </Link>
          {/* )} */}

          {/* {isLoggedIn && ( */}
          <div>
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
                <Button
                  onClick={gotoProfile}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  My Profile
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  to="/Logout"
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
          {/* )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

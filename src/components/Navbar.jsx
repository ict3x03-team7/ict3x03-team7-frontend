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
  backgroundColor: "white",
  color: "black",
  position: "fixed",
  top: "0",
  zIndex: "1000",
};

const logoStyle = {
  maxHeight: "70px",
};

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  // Define a state variable to store the session data
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Fetch user session data when the component mounts
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/v1/auth/session",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setSessionData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    fetchUserSession();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoProfile = () => {
    if (sessionData && sessionData.result) {
      const { userID } = sessionData.result;
      navigate("/Profile", { state: { userID } });
    }
  };

  const gotoRecipe = () => {
    if (sessionData && sessionData.result) {
      const { userID } = sessionData.result;
      navigate("/Recipes", { state: { userID } });
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8085/api/v1/auth/logout", null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logout successful:", response.data);
          navigate("/Logout");
          setTimeout(() => {
            window.location.reload();
          }, 100);
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

          {sessionData && sessionData.result && (
            <>
              {sessionData.result.role === "Student" && (
                <Link to="/Recipes" style={{ color: "black" }}>
                  <Button color="inherit" onClick={gotoRecipe}>
                    Search Recipe
                  </Button>
                </Link>
              )}
              {sessionData.result.role === "Admin" && (
                <Link to="/Dashboard" style={{ color: "black" }}>
                  <Button color="inherit">Admin Dashboard</Button>
                </Link>
              )}
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
                      style={{
                        color: "black",
                        textDecoration: "none",
                        textTransform: "none",
                      }}
                    >
                      My Profile
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {/* <Link
                      to="/Logout"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Link> */}
                    <Button
                      onClick={handleLogout}
                      style={{
                        color: "black",
                        textDecoration: "none",
                        textTransform: "none",
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import logoImage from "../assets/SITLogo.png";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

function Login() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginTop: "70px",
  };

  const boxStyle = {
    padding: "20px", // Add padding to the box
    border: "1px solid grey", // Add a grey border
    width: "50%", // Set the width of the box
  };

  const logoStyle = {
    maxHeight: "100px", // Adjust the logo size as needed
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center", // Center vertically within the content
    gap: "10px", // Adjust the space between image, divider, and text
    justifyContent: "center",
  };

  const dividerStyle = {
    height: "40px", // Set the height of the vertical line
    borderLeft: "1px solid black", // Style the vertical line
    marginRight: "10px", // Adjust the space between the line and text
  };

  const buttonStyle = {
    margin: "10px", // Add margin between buttons
    width: "100%", // Adjust button width
  };

  const [isHoveredRegister, setIsHoveredRegister] = useState(false);

  const handleRegisterMouseEnter = () => {
    setIsHoveredRegister(true);
  };

  const handleRegisterMouseLeave = () => {
    setIsHoveredRegister(false);
  };

  let navigate = useNavigate();
  const loginButton = () => {
    navigate("/LoginStudentStaff");
  };
  const RegisterLink = () => {
    navigate("/Register");
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <div style={contentStyle}>
          <img src={logoImage} alt="Logo" style={logoStyle} />
          <Divider orientation="vertical" style={dividerStyle} />
          <Typography variant="h4">SIT-Recipe</Typography>
        </div>

        <br />

        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <p style={{ margin: "0 10px" }}>Sign In As</p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <br />

        <div style={{ alignItems: "center", marginRight: "15px" }}>
          <Button
            variant="contained"
            size="medium"
            style={buttonStyle}
            onClick={loginButton}
          >
            Student
          </Button>

          <Button
            variant="contained"
            size="medium"
            style={buttonStyle}
            onClick={loginButton}
          >
            Admin
          </Button>
        </div>

        <br />
        <hr style={{ borderTop: "1px solid grey" }} />

        <p
          variant="body1"
          style={{ color: "black", marginTop: "10px", textAlign: "center" }}
        >
          For students who do not have an account, please{" "}
          <Link
            style={{
              color: isHoveredRegister ? "maroon" : "blue",
              textDecoration: isHoveredRegister ? "underline" : "none",
            }}
            onMouseEnter={handleRegisterMouseEnter}
            onMouseLeave={handleRegisterMouseLeave}
            onClick={RegisterLink}
          >
            Sign Up
          </Link>{" "}
          here.
        </p>
      </Paper>
    </div>
  );
}

export default Login;

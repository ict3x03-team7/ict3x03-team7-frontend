import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import "../css/style.css"; // Import custom CSS here
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

function LoginStudentStaff() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginTop: "10px",
  };

  const boxStyle = {
    padding: "20px", // Add padding to the box
    border: "1px solid grey", // Add a grey border
    width: "50%", // Set the width of the box
    marginBottom: "50px",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isHoveredForgot, setIsHoveredForgot] = useState(false);
  const handleForgotMouseEnter = () => {
    setIsHoveredForgot(true);
  };
  const handleForgotMouseLeave = () => {
    setIsHoveredForgot(false);
  };
  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleLinkMouseEnter = () => {
    setIsHoveredLink(true);
  };
  const handleLinkMouseLeave = () => {
    setIsHoveredLink(false);
  };

  let navigate = useNavigate();
  const chooseLoginAccountButton = () => {
    navigate("/");
  };
  const loginVerificationButton = () => {
    navigate("/LoginVerification");
  };
  const gotoRegisterPage = () => {
    navigate("/Register");
  };
  const gotoForgetPassword1Page = () => {
    navigate("/ForgetPassword2");
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <p style={{ margin: "0 10px", fontSize: "25px" }}>Login Here</p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <br />
        <br />

        {/* Default Profile Pic */}
        <Avatar
          alt="Profile Pic"
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />

        <br />
        <br />

        {/* Email TextField with Icon */}
        <FormControl sx={{ width: "100%" }} size="small">
          <OutlinedInput
            id="email"
            type="text"
            placeholder="Enter email"
            startAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="email icon">
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <br />

        {/* Password TextField with Icon */}
        <FormControl sx={{ width: "100%" }} size="small">
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            startAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="password icon">
                  <LockIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <br />
        <br />

        <Button
          variant="contained"
          size="medium"
          style={{ width: "100%" }}
          onClick={loginVerificationButton}
        >
          Login
        </Button>

        <br />
        <br />

        <Button
          variant="outlined"
          size="medium"
          style={{ width: "100%" }}
          onClick={chooseLoginAccountButton}
        >
          Back
        </Button>

        <br />
        <br />

        <div>
          <Link
            style={{
              color: isHoveredForgot ? "maroon" : "blue",
              textDecoration: isHoveredForgot ? "underline" : "none",
              marginRight: "10px",
            }}
            onMouseEnter={handleForgotMouseEnter}
            onMouseLeave={handleForgotMouseLeave}
            onClick={gotoForgetPassword1Page}
          >
            <p style={{ margin: "0" }}>Forgot Password?</p>
          </Link>

          <p>
            Dont have an account yet?{" "}
            <Link
              style={{
                color: isHoveredLink ? "maroon" : "blue",
                textDecoration: isHoveredLink ? "underline" : "none",
                marginRight: "10px",
              }}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
              onClick={gotoRegisterPage}
            >
              Register Now!
            </Link>
          </p>
        </div>
      </Paper>
    </div>
  );
}

export default LoginStudentStaff;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SecurityIcon from "@mui/icons-material/Security";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

function LoginVerification() {
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

  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleLinkMouseEnter = () => {
    setIsHoveredLink(true);
  };
  const handleLinkMouseLeave = () => {
    setIsHoveredLink(false);
  };

  let navigate = useNavigate();
  const recipeButton = () => {
    navigate("/Recipes");
  };
  const chooseLoginAccountButton = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <p style={{ margin: "0 10px", fontSize: "25px" }}>OTP Verification</p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <br />

        <Alert severity="success">
          We've sent a verification code to your email - someoneemail@gmail.com
        </Alert>

        <br />
        <br />

        <FormControl sx={{ width: "100%" }} size="small">
          <OutlinedInput
            id="optCode"
            type="text"
            placeholder="Enter Verification Code"
            startAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="opt code icon">
                  <SecurityIcon />
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
          onClick={recipeButton}
        >
          Submit
        </Button>

        <br />
        <br />

        <Button
          variant="outlined"
          size="medium"
          style={{ width: "100%" }}
          onClick={chooseLoginAccountButton}
        >
          Cancel
        </Button>

        <br />
        <br />

        <p>
          Didn't receive OTP?{" "}
          <Link
            style={{
              color: isHoveredLink ? "maroon" : "blue",
              textDecoration: isHoveredLink ? "underline" : "none",
              marginRight: "10px",
            }}
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
          >
            RESEND OTP
          </Link>
        </p>
      </Paper>
    </div>
  );
}

export default LoginVerification;

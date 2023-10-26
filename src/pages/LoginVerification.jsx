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
import { useLocation } from "react-router-dom";
import axios from "axios";

function LoginVerification(props) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70px",
  };

  const boxStyle = {
    padding: "20px",
    border: "1px solid grey",
    width: "50%",
  };

  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleLinkMouseEnter = () => {
    setIsHoveredLink(true);
  };
  const handleLinkMouseLeave = () => {
    setIsHoveredLink(false);
  };

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  let navigate = useNavigate();

  const recipeButton = () => {
    if (!otp) {
      setOtpError("Verification code is required");
    } else if (!/^[0-9]{6}$/.test(otp)) {
      setOtpError("Verification code should be a 6-digit number");
    } else {
      navigate("/Recipes");
    }
  };

  // Function to handle OTP verification
  const location = useLocation();
  // console.log(location);
  // console.log(location.state.email);

  const verifyOtp = async () => {
    if (!otp) {
      setOtpError("Verification code is required");
      return;
    } else if (!/^[0-9]{6}$/.test(otp)) {
      setOtpError("Verification code should be a 6-digit number");
      return;
    }

    try {
      // Send a request to the backend to verify OTP
      const getparsedemail = location.state.email;
      console.log(getparsedemail, otp);
      const response = await axios.post(
        "http://localhost:8085/api/v1/auth/login/verify",
        {
          email: getparsedemail,
          totp: otp,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        // Successful verification
        navigate("/Recipes");
      } else {
        // Handle unsuccessful verification
        setOtpError("Invalid OTP code");
      }
    } catch (error) {
      console.error("API Error:", error);
      setOtpError("An error occurred during verification");
    }
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
          {" checkkkk:"}
          {location.state.email}
        </Alert>

        <br />
        <br />

        <FormControl sx={{ width: "100%" }} size="small">
          <OutlinedInput
            id="otpCode"
            type="text"
            placeholder="Enter Verification Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="otp code icon">
                  <SecurityIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {otpError && (
          <Alert severity="error" style={{ marginTop: "5px" }}>
            {otpError}
          </Alert>
        )}

        <br />
        <br />
        <br />

        <Button
          variant="contained"
          size="medium"
          style={{ width: "100%" }}
          onClick={isVerified ? recipeButton : verifyOtp}
        >
          {isVerified ? "Continue" : "Submit"}
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

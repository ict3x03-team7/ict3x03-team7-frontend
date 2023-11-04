import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import FP1Image from "../assets/forgetpassword1.jpg";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../App";

function FPTwo(props) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0px",
  };

  const boxStyle = {
    padding: "20px",
    border: "1px solid grey",
    width: "50%",
    paddingTop: "30px",
    paddingBottom: "20px",
    marginBottom: "50px",
  };

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  let navigate = useNavigate();

  // go to FP1
  const gotoFPOne = () => {
    navigate("/FPOne");
  };

  const location = useLocation();

  const gotoFPThree = async () => {
    if (verifyOtp()) {
      try {
        const email = location.state.email; // Get the email from the location state

        // Make an API call to verify the OTP
        const response = await axios.post(`${backendURL}/api/v1/auth/verify`, {
          email: email,
          totp: otp,
        });

        if (response.status === 200 && response.data.result.isVerified) {
          // OTP is verified, navigate to FPThree
          navigate("/FPThree", { state: { email } });
        } else {
          // Handle the case where OTP is not verified or other errors
        }
      } catch (error) {
        // Handle network errors or API errors
        console.error("API Error");
      }
    }
  };

  const verifyOtp = () => {
    let valid = true;

    // OTP validation
    if (!otp) {
      setOtpError("Verification code is required");
      valid = false;
    } else if (!/^[0-9]{6}$/.test(otp)) {
      setOtpError("Verification code should be a 6-digit number");
      valid = false;
    } else {
      setOtpError("");
    }

    return valid;
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <img
          src={FP1Image}
          alt="Logo"
          style={{ width: "100%", height: "300px" }}
        />

        {/* Heading */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <p style={{ margin: "0 10px", fontSize: "25px" }}>Forget Password</p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <p style={{ textAlign: "center" }}>Step 2: Enter a OTP</p>

        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <p>OTP:</p>
          <FormControl sx={{ width: "100%" }} size="small">
            <OutlinedInput
              id="otpCode"
              type="text"
              placeholder="Enter Verification Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormControl>
          {otpError && (
            <Alert severity="error" style={{ marginTop: "5px" }}>
              {otpError}
            </Alert>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="medium"
            style={{ marginRight: "15px" }}
            onClick={gotoFPOne}
          >
            Cancel
          </Button>

          <Button variant="contained" size="medium" onClick={gotoFPThree}>
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default FPTwo;

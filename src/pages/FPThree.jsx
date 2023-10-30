import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import FP1Image from "../assets/forgetpassword1.jpg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FPThree() {
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  let navigate = useNavigate();

  // go to FP2
  const gotoFPTwo = () => {
    navigate("/FPTwo");
  };

  const gotoLogin = async () => {
    if (verifyPassword()) {
      try {
        const getparseemail = location.state.email; // Get the email from the location state

        // Make an API call to reset the password
        const response = await axios.post(
          "http://localhost:8085/api/v1/auth/resetpassword",
          {
            email: getparseemail,
            newPassword: password, // Use the new password entered by the user
          }
        );

        if (response.status === 200 && response.data.result.isSuccess) {
          alert("Password Changed Successfully!");

          // Password reset was successful; you can navigate to a success page or login page
          navigate("/");
        } else {
          // Handle the case where the password reset was not successful or other errors
        }
      } catch (error) {
        // Handle network errors or API errors
        console.error("API Error");
      }
    }
  };

  const location = useLocation();

  const verifyPassword = () => {
    let valid = true;

    // Password validation

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (password !== confirmedPassword) {
      setConfirmedPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmedPasswordError("");
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

        <p style={{ textAlign: "center" }}>Step 3: Enter your New Password.</p>

        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <p>New Password:</p>
          <FormControl sx={{ width: "100%" }} size="small">
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInput={(e) => {
                if (e.target.value.length > 100) {
                  e.target.value = e.target.value.slice(0, 100);
                }
                setPassword(e.target.value);
              }}
              error={!!passwordError}
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
            {passwordError && (
              <Alert severity="error" style={{ marginTop: "5px" }}>
                {passwordError}
              </Alert>
            )}
          </FormControl>

          <p>Confirm Password:</p>
          <FormControl sx={{ width: "100%" }} size="small">
            <OutlinedInput
              id="outlined-adornment-confirmed-password"
              type={showPassword2 ? "text" : "password"}
              placeholder="Enter Confirmed Password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              onInput={(e) => {
                if (e.target.value.length > 100) {
                  e.target.value = e.target.value.slice(0, 100);
                }
                setConfirmedPassword(e.target.value);
              }}
              error={!!confirmedPasswordError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {confirmedPasswordError && (
              <Alert severity="error" style={{ marginTop: "5px" }}>
                {confirmedPasswordError}
              </Alert>
            )}
          </FormControl>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="medium"
            style={{ marginRight: "15px" }}
            onClick={gotoFPTwo}
          >
            Cancel
          </Button>

          <Button variant="contained" size="medium" onClick={gotoLogin}>
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default FPThree;

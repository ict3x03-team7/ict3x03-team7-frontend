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

function ForgetPassword2() {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  let navigate = useNavigate();
  const gotoLoginStudentStaff = () => {
    navigate("/LoginStudentStaff");
  };
  const gotoVerificationPage = () => {
    // Check if input is valid before navigating
    if (validateInputs()) {
      navigate("/LoginVerification");
    }
  };
  const gotoLogin = () => {
    navigate("/");
  };

  const validateInputs = () => {
    let valid = true;

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}[\]|:;"<>,./?])[A-Za-z\d~`!@#$%^&*()\-_+={}[\]|:;"<>,./?]{10,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must meet the specified criteria.");
      valid = false;
    } else if (password.length < 12) {
      setPasswordError("Password must be at least 12 characters");
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

        <p style={{ textAlign: "center" }}>
          Enter your email and new password, and we'll help you reset your
          password.
        </p>

        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          {/* Email TextField with Icon */}
          <p>Email:</p>
          <FormControl sx={{ width: "100%" }} size="small">
            <OutlinedInput
              id="email"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
            />
            {emailError && (
              <Alert severity="error" style={{ marginTop: "5px" }}>
                {emailError}
              </Alert>
            )}
          </FormControl>

          <p>New Password:</p>
          <FormControl sx={{ width: "100%" }} size="small">
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={gotoLogin}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="medium"
            onClick={gotoVerificationPage}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ForgetPassword2;

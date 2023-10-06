import React, { useState } from "react";
import defaultprofilepic from "../assets/defaultprofilepic.jpg";
import qr from "../assets/QR/qr.avif";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

function Profile() {
  const gridItemStyle = {
    padding: "16px",
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const [selectedButton, setSelectedButton] = useState("edit");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // email and phone number validation
  // State variables for email and phone number
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Function to validate email
  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
  };

  // Function to validate phone number
  const validatePhoneNumber = () => {
    const phoneRegex = /^[89]\d{7}$/;
    if (!phoneNumber.match(phoneRegex)) {
      setPhoneNumberError("Invalid Phone Number");
    } else {
      setPhoneNumberError("");
    }
  };

  // Function to handle input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // State variables for password and confirm password
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  // Function to validate password
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}[\]|:;"<>,./?])[A-Za-z\d~`!@#$%^&*()\-_+={}[\]|:;"<>,./?]{10,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must meet the specified criteria.");
    } else if (password.length < 12) {
      setPasswordError("Password must be at least 12 characters");
    } else {
      setPasswordError("");
    }
  };

  // Function to validate confirmed password
  const validateConfirmedPassword = () => {
    if (password !== confirmedPassword) {
      setConfirmedPasswordError("Passwords do not match");
    } else {
      setConfirmedPasswordError("");
    }
  };

  // Function to handle input changes
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  };

  // when button clicked
  const handleSave_emailphoneno = () => {
    // Validate email, phone number
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();

    // Initialize an array to collect error messages
    const errorMessages = [];

    // Check email validation
    if (!isEmailValid) {
      errorMessages.push("Invalid Email");
    }

    // Check phone number validation
    if (!isPhoneNumberValid) {
      errorMessages.push("Invalid Phone Number");
    }

    if (errorMessages.length > 0) {
      // If there are error messages, display them in the Alert component
      setErrorMessages(errorMessages);
    }
  };

  const handleSave_password = () => {
    // Validate password, and confirmed password
    const isPasswordValid = validatePassword();
    const isConfirmedPasswordValid = validateConfirmedPassword();

    // Initialize an array to collect error messages
    const errorMessages = [];

    // Check password validation
    if (!isPasswordValid) {
      errorMessages.push("Invalid Password");
    }

    // Check confirmed password validation
    if (!isConfirmedPasswordValid) {
      errorMessages.push("Passwords do not match");
    }

    if (errorMessages.length > 0) {
      // If there are error messages, display them in the Alert component
      setErrorMessages(errorMessages);
    }
  };

  const handleSave_profilepicture = () => {
    // save the profile into the database
  };

  // profile picture
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image or GIF
      if (file.type.startsWith("image/") || file.type === "image/gif") {
        setSelectedFile(file);
      } else {
        // Invalid file type, you can display an error message here
        console.error("Invalid file type. Please select an image or GIF.");
      }
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setSelectedFile(null); // Clear the selectedFile state to remove the image
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} style={gridItemStyle}>
          <Paper elevation={3}>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                style={{ width: "100%" }}
                alt="Profile Pic"
              ></img>
            ) : (
              <img
                src={defaultprofilepic}
                style={{ width: "100%" }}
                alt="Profile Pic"
              ></img>
            )}

            <div style={{ padding: "15px", paddingLeft: "25px" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 1,
                    padding: "15px",
                    paddingLeft: "25px",
                  }}
                >
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <b>Name:</b> Johnny Lim
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <b>Admin Number:</b> 2101234
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <b>Gender:</b> M
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <b>Course:</b> Food Technology
                  </Typography>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <Typography style={{ marginTop: "15px" }}>
                    <b>Scan Me: 2FA</b>
                  </Typography>
                  <img src={qr} style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <div style={{ padding: "10px", paddingLeft: "20px" }}>
          <h1>My Profile</h1>

          <div style={{ marginTop: "40px", marginBottom: "0px" }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: "15px",
                backgroundColor: selectedButton === "edit" ? "purple" : "white",
                color: selectedButton === "edit" ? "white" : "black",
              }}
              onClick={() => handleButtonClick("edit")}
            >
              Edit My Account
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: "15px",
                backgroundColor:
                  selectedButton === "updatePic" ? "purple" : "white",
                color: selectedButton === "updatePic" ? "white" : "black",
              }}
              onClick={() => handleButtonClick("updatePic")}
            >
              Update Profile Picture
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: "15px",
                backgroundColor:
                  selectedButton === "changePass" ? "purple" : "white",
                color: selectedButton === "changePass" ? "white" : "black",
              }}
              onClick={() => handleButtonClick("changePass")}
            >
              Change Password
            </Button>
          </div>

          <Collapse in={selectedButton === "edit"} timeout="auto" unmountOnExit>
            <h3 style={{ marginTop: "50px" }}>Update Account Details</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <div style={{ flex: 1 }}>
                <p>Email:</p>
                <FormControl sx={{ width: "100%" }} size="small">
                  <OutlinedInput
                    id="emailAddress"
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={validateEmail}
                  />
                  {emailError && (
                    <Alert severity="error" style={{ marginBottom: "10px" }}>
                      {emailError}
                    </Alert>
                  )}
                </FormControl>
              </div>

              <div style={{ flex: 1 }}>
                <p>Phone Number:</p>
                <FormControl sx={{ width: "100%" }} size="small">
                  <OutlinedInput
                    id="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onBlur={validatePhoneNumber}
                  />
                  {phoneNumberError && (
                    <Alert severity="error" style={{ marginBottom: "10px" }}>
                      {phoneNumberError}
                    </Alert>
                  )}
                </FormControl>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Button
                variant="outlined"
                size="medium"
                style={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSave_emailphoneno}
              >
                Save
              </Button>
            </div>
          </Collapse>

          <Collapse
            in={selectedButton === "updatePic"}
            timeout="auto"
            unmountOnExit
            style={{ marginBottom: "50px" }}
          >
            <h3 style={{ marginTop: "50px" }}>Update Profile Picture</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "20px" }}>Profile Picture:</p>
              <Button
                style={{ backgroundColor: "grey" }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload a file
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*,.gif"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && ( // Display the "Remove" button if an image is selected
                <Button
                  style={{ backgroundColor: "red", marginLeft: "20px" }}
                  variant="contained"
                  onClick={handleRemoveImage}
                >
                  <DeleteIcon />
                </Button>
              )}
            </div>
            <div>
              <p>File Name: </p>
              <p style={{ color: "blue" }}>
                {selectedFile ? selectedFile.name : "No file selected"}
              </p>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Button
                variant="outlined"
                size="medium"
                style={{ marginRight: "20px" }}
                onClick={handleRemoveImage}
              >
                Cancel
              </Button>
              <Button variant="contained" size="medium">
                Save
              </Button>
            </div>
          </Collapse>

          <Collapse
            in={selectedButton === "changePass"}
            timeout="auto"
            unmountOnExit
            style={{ marginBottom: "50px" }}
          >
            <h3 style={{ marginTop: "50px" }}>Change Account Password</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <p>Password:</p>
                <FormControl sx={{ width: "100%" }} size="small">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
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
                    <Alert severity="error" style={{ marginBottom: "10px" }}>
                      {passwordError}
                    </Alert>
                  )}
                </FormControl>
              </div>

              <div style={{ flex: 1 }}>
                <p>Confirm Password:</p>
                <FormControl sx={{ width: "100%" }} size="small">
                  <OutlinedInput
                    id="outlined-adornment-confirmed-password"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Enter Confirmed Password"
                    value={confirmedPassword}
                    onChange={handleConfirmedPasswordChange}
                    onBlur={validateConfirmedPassword}
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
                    <Alert severity="error" style={{ marginBottom: "10px" }}>
                      {confirmedPasswordError}
                    </Alert>
                  )}
                </FormControl>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Button
                variant="outlined"
                size="medium"
                style={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSave_password}
              >
                Save
              </Button>
            </div>
          </Collapse>
        </div>
      </Grid>
    </div>
  );
}

export default Profile;

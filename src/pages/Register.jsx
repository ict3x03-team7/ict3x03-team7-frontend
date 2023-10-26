import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Register() {
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

  const [isHoveredLink2, setIsHoveredLink2] = useState(false);
  const handleLinkMouseEnter2 = () => {
    setIsHoveredLink2(true);
  };
  const handleLinkMouseLeave2 = () => {
    setIsHoveredLink2(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setGenderError(""); // Clear gender error when a valid selection is made
  };

  const [studentID, setStudentID] = useState("");
  const [studentIDError, setStudentIDError] = useState("");

  // profile picture
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilebase64, setSelectedFilebase64] = useState("");

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image or GIF
      if (file.type.startsWith("image/") || file.type === "image/gif") {
        setSelectedFile(file);
        convertFile(file);
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

  function convertFile(file) {
    if (file) {
      const fileRef = file || "";
      const fileType = fileRef.type || "";
      console.log("This file upload is of type:", fileType);

      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);

      reader.onload = function (ev) {
        // Convert it to base64
        setSelectedFilebase64(
          "data:" + fileType + ";base64," + btoa(ev.target.result)
        );
      };
    }
  }

  // Example data
  const userData = {
    userID: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: "Student",
    gender: gender,
    mobileNumber: phoneNumber,
    lastLogin: null,
    studentID: studentID,
    fileBase64: selectedFile ? selectedFilebase64 : null,
    fileName: selectedFile ? selectedFile.name : null,
    fileSize: selectedFile ? selectedFile.size : null,
    fileType: selectedFile ? selectedFile.type : null,
  };

  let navigate = useNavigate();
  const chooseLoginAccountButton = () => {
    if (validateInputs()) {
      console.log(userData);

      // Call the createUser function with the example data
      createUser(userData);

      // go to login again
      navigate("/");
    }
  };

  const validateInputs = () => {
    let valid = true;

    // First Name validation
    const nameRegex = /^[A-Z][a-zA-Z]*$/; // Allows only letters and ensures the first letter is capitalized
    if (!nameRegex.test(firstName)) {
      setFirstNameError("Invalid First Name");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Last Name validation
    if (!nameRegex.test(lastName)) {
      setLastNameError("Invalid Last Name");
      valid = false;
    } else {
      setLastNameError("");
    }

    // phone number
    const phoneRegex = /^[89]\d{7}$/;
    // Test the phone number against the regex pattern
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Invalid Phone Number");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    // Gender validation
    if (!["Male", "Female"].includes(gender)) {
      setGenderError("Please select a Gender.");
      valid = false;
    } else {
      setGenderError("");
    }

    // Student ID Validation  (last 5 years not inclusive of currentt year  eg 18-23)
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 5;

    // Validate the Student ID format
    const studentIDRegex = /^[0-9]{7}$/;

    if (!studentIDRegex.test(studentID)) {
      setStudentIDError("Invalid Student ID format");
      valid = false;
    } else {
      // Extract the first two digits of the student ID
      const firstTwoDigits = parseInt(studentID.substring(0, 2));

      // Check if the first two digits represent a year within the last 5 years
      if (
        firstTwoDigits < (currentYear % 100) - 5 ||
        firstTwoDigits > currentYear % 100
      ) {
        setStudentIDError("Invalid Student ID year");
        valid = false;
      } else {
        setStudentIDError("");
      }
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid Email");
      valid = false;
    } else {
      setEmailError("");
    }

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

  async function createUser(data) {
    const apiUrl = "http://localhost:8085/api/v1/user";

    try {
      const response = await axios.post(apiUrl, data);
      console.log(data);
      console.log(response);
      console.log("User created successfully:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        {/* Heading */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <p style={{ margin: "0 10px", fontSize: "25px" }}>
            Create An Account
          </p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <br />
        <br />

        {/* Default Profile Pic */}
        {selectedFile ? (
          <Avatar
            alt="Profile Pic"
            src={URL.createObjectURL(selectedFile)}
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
        ) : (
          <Avatar
            alt="Profile Pic"
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
        )}

        <br />
        <br />

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <p>First Name:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setFirstName(e.target.value);
                    setFirstNameError("");
                  } else {
                    setFirstNameError(
                      "First Name should not exceed 100 characters"
                    );
                  }
                }}
                error={!!firstNameError}
              />
              {firstNameError && (
                <Alert severity="error">{firstNameError}</Alert>
              )}
            </FormControl>
          </div>

          <div style={{ flex: 1 }}>
            <p>Last Name:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setLastName(e.target.value);
                    setLastNameError("");
                  } else {
                    setLastNameError(
                      "Last Name should not exceed 100 characters"
                    );
                  }
                }}
                error={!!lastNameError}
              />
              {lastNameError && <Alert severity="error">{lastNameError}</Alert>}
            </FormControl>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <p>Email:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="emailAddress"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setEmail(e.target.value);
                    setEmailError("");
                  } else {
                    setEmailError("Email should not exceed 100 characters");
                  }
                }}
                error={!!emailError}
              />
              {emailError && (
                <Alert severity="error" style={{ marginTop: "5px" }}>
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
                onChange={(e) => {
                  if (e.target.value.length <= 8) {
                    setPhoneNumber(e.target.value);
                    setPhoneNumberError("");
                  } else {
                    setPhoneNumberError(
                      "Phone Number should not exceed 8 characters"
                    );
                  }
                }}
                error={!!phoneNumberError}
              />
              {phoneNumberError && (
                <Alert severity="error" style={{ marginBottom: "10px" }}>
                  {phoneNumberError}
                </Alert>
              )}
            </FormControl>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <p>Student ID:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="studentID"
                type="text"
                placeholder="Enter School ID"
                value={studentID}
                onChange={(e) => {
                  if (e.target.value.length <= 7) {
                    setStudentID(e.target.value);
                    setStudentIDError("");
                  } else {
                    setStudentIDError(
                      "School ID should not exceed 7 characters"
                    );
                  }
                }}
                error={!!studentIDError}
              />
              {studentIDError && (
                <Alert severity="error" style={{ marginBottom: "10px" }}>
                  {studentIDError}
                </Alert>
              )}
            </FormControl>
          </div>

          <div style={{ flex: 1 }}>
            <p>Gender:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
                error={!!genderError}
                displayEmpty // Display the empty option
              >
                <MenuItem value="">
                  <em style={{ color: "#c1c1c1" }}>- Select A Gender -</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
              {genderError && (
                <Alert severity="error" style={{ marginBottom: "10px" }}>
                  {genderError}
                </Alert>
              )}
            </FormControl>
          </div>
        </div>

        <br />
        <br />

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
          <p style={{ marginLeft: "20px", color: "blue" }}>
            {selectedFile ? selectedFile.name : "No file selected"}
          </p>
        </div>

        <br />

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <p>Password:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setPassword(e.target.value);
                    setPasswordError("");
                  } else {
                    setPasswordError(
                      "Password should not exceed 100 characters"
                    );
                  }
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
          </div>

          <div style={{ flex: 1 }}>
            <p>Confirm Password:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="outlined-adornment-confirmed-password"
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter Confirmed Password"
                value={confirmedPassword}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setConfirmedPassword(e.target.value);
                    setConfirmedPasswordError("");
                  } else {
                    setConfirmedPasswordError(
                      "Confirmed Password should not exceed 100 characters"
                    );
                  }
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
        </div>

        <br />
        <br />
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="medium"
            style={{ marginRight: "15px" }}
            onClick={chooseLoginAccountButton}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="medium"
            onClick={chooseLoginAccountButton}
          >
            Sign Up
          </Button>
        </div>

        <br />
        <br />

        <p>
          Already have an account?{" "}
          <Link
            style={{
              color: isHoveredLink2 ? "maroon" : "blue",
              textDecoration: isHoveredLink2 ? "underline" : "none",
              marginRight: "10px",
            }}
            onMouseEnter={handleLinkMouseEnter2}
            onMouseLeave={handleLinkMouseLeave2}
            onClick={chooseLoginAccountButton}
          >
            Login Now!
          </Link>
        </p>
      </Paper>
    </div>
  );
}

export default Register;

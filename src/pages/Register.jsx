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

  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
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

  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleLinkMouseEnter = () => {
    setIsHoveredLink(true);
  };
  const handleLinkMouseLeave = () => {
    setIsHoveredLink(false);
  };
  const [isHoveredLink2, setIsHoveredLink2] = useState(false);
  const handleLinkMouseEnter2 = () => {
    setIsHoveredLink2(true);
  };
  const handleLinkMouseLeave2 = () => {
    setIsHoveredLink2(false);
  };

  let navigate = useNavigate();
  const chooseLoginAccountButton = () => {
    navigate("/");
  };

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
        <Avatar
          alt="Profile Pic"
          sx={{ width: 150, height: 150, margin: "0 auto" }}
        />

        <br />
        <br />

        {/* Error & Success Message */}
        <Alert severity="error">
          Error: All the fields need to be filled in.
        </Alert>
        <Alert severity="success">
          Account Created Successfully!{" "}
          <Link
            href="#"
            style={{
              color: isHoveredLink ? "maroon" : "blue",
              textDecoration: isHoveredLink ? "underline" : "none",
              marginRight: "10px",
            }}
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
            onClick={chooseLoginAccountButton}
          >
            Login Now.
          </Link>{" "}
        </Alert>

        <br />

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <p>First Name:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="firstName"
                type="text"
                placeholder="Enter First Name"
              />
            </FormControl>
          </div>

          <div style={{ flex: 1 }}>
            <p>Last Name:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
              />
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
              />
            </FormControl>
          </div>

          <div style={{ flex: 1 }}>
            <p>Phone Number:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
              />
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
              />
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
                displayEmpty // Display the empty option
              >
                <MenuItem value="">
                  <em style={{ color: "#c1c1c1" }}>- Select A Gender -</em>
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
              </Select>
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
            href="#file-upload"
          >
            Upload a file
            <VisuallyHiddenInput type="file" />
          </Button>
          <p style={{ marginLeft: "20px", color: "blue" }}>myprofilepic.jpg</p>
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
          </div>

          <div style={{ flex: 1 }}>
            <p>Confirm Password:</p>
            <FormControl sx={{ width: "100%" }} size="small">
              <OutlinedInput
                id="outlined-adornment-confirmed-password"
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter Confirmed Password"
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

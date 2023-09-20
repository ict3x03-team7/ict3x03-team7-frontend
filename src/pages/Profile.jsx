import React, { useState } from "react";
import profilepicture from "../assets/profilepicture.jpg";
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} style={gridItemStyle}>
          <Paper elevation={3}>
            <img src={profilepicture} style={{ width: "100%" }} />
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
                  <Typography>
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

          <div style={{ marginTop: "10px", marginBottom: "30px" }}>
            <Alert severity="error">Error: Account Failed to Update.</Alert>
            <Alert severity="success">Account Updated Successfully!</Alert>
          </div>

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
          </Collapse>

          <Collapse
            in={selectedButton === "updatePic"}
            timeout="auto"
            unmountOnExit
            style={{ marginBottom: "50px" }}
          >
            <h3 style={{ marginTop: "50px" }}>Update Profile Picture</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                style={{ backgroundColor: "grey" }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <p style={{ marginLeft: "20px", color: "blue" }}>
                myprofilepic.jpg
              </p>
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
                          aria-label
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
          </Collapse>

          {/* buttons add here */}
          <div style={{ marginTop: "30px" }}>
            <Button
              variant="outlined"
              size="medium"
              style={{ marginRight: "20px" }}
            >
              Cancel
            </Button>
            <Button variant="contained" size="medium">
              Save
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default Profile;

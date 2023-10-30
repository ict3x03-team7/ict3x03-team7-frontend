import React, { useState, useEffect } from "react";
import defaultprofilepic from "../assets/defaultprofilepic.jpg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const gridItemStyle = {
    padding: "16px",
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

  const [selectedButton, setSelectedButton] = useState("edit");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // State variables for password and confirm password
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  const location = useLocation();
  const userID = location.state.userID;

  const [user, setUser] = useState(null);

  const updatePassword = async (userID, newPassword) => {
    try {
      const response = await axios.put(
        `http://localhost:8085/api/v1/user/${userID}/updatePassword`,
        {
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully.");
        // once successful, clear textbox
        setPassword("");
        setConfirmedPassword("");
      } else {
        console.error("Failed to update password. Server returned an error.");
      }
    } catch (error) {
      console.error("Error while updating password");
    }
  };

  const method_changemypassword = () => {
    updatePassword(userID, password);
  };

  const handleSave_password = () => {
    let valid = true;

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

    if (valid) {
      method_changemypassword();
    }
  };

  const fetchUserByID = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/v1/user/${userID}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data.result;
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  // Call the function with the userID from location.state
  useEffect(() => {
    fetchUserByID(userID);
  }, [userID]);

  const enable2FA = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8085/api/v1/auth/enable",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const result = response.data.result;
        if (result.isEnabled) {
          alert("2FA has been enabled successfully.");

          // Wait for 2 seconds and then refresh the page
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("Failed to enable 2FA.");
        }
      } else {
        console.error("Failed to enable 2FA. Server returned an error.");
      }
    } catch (error) {
      console.error("Error while enabling 2FA");
    }
  };

  let navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/");
  };

  // Function to delete a user
  const deleteUser = async (userID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8085/api/v1/user/${userID}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const result = response.data.result;
        if (result.isSuccess) {
          alert("Your account have been deleted successfully!");
          gotoLogin();
        } else {
          console.error("Failed to delete the user.");
        }
      } else {
        console.error("Failed to delete the user. Server returned an error.");
      }
    } catch (error) {
      console.error("Error while deleting the user");
    }
  };

  // Event handler for the button click
  const handleDeleteUser = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) {
      deleteUser(userID);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} style={gridItemStyle}>
              <Paper elevation={3}>
                {user.profilePictureLink ? (
                  <img
                    src={user.profilePictureLink}
                    style={{ width: "100%" }}
                    alt="Profile Pic"
                  />
                ) : (
                  <img
                    src={defaultprofilepic}
                    style={{ width: "100%" }}
                    alt="Profile Pic"
                  />
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
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        <b>Name:</b> {user.firstName} {user.lastName}
                      </Typography>
                      {user.role === "Student" && (
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <b>Admin Number:</b> {user.studentID}
                        </Typography>
                      )}
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        <b>Gender:</b> {user.gender}
                      </Typography>
                      {user.role === "Student" && (
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <b>Course:</b> Food Technology
                        </Typography>
                      )}

                      {/* add a button for delete */}

                      {user.role === "Student" && (
                        <Button
                          variant="contained"
                          color="error"
                          style={{ marginTop: "30px" }}
                          onClick={handleDeleteUser}
                        >
                          Delete My Account
                        </Button>
                      )}
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Typography style={{ marginTop: "15px" }}>
                        <b>Scan Me: 2FA</b>
                      </Typography>
                      {user.mfa_qr ? (
                        <div>
                          <p
                            style={{
                              textAlign: "center",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            Go to{" "}
                            <a
                              target="blank"
                              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
                            >
                              Google PlayStore
                            </a>{" "}
                            or{" "}
                            <a
                              target="blank"
                              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                            >
                              Apple App Store
                            </a>{" "}
                            to download Authenticator App, and use this to scan
                            the QR Code to get your OTP.
                          </p>
                          <img
                            src={user.mfa_qr}
                            style={{ width: "100%" }}
                            alt="2FA QR Code"
                          />
                        </div>
                      ) : null}
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
                    backgroundColor:
                      selectedButton === "edit" ? "purple" : "white",
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
                      selectedButton === "changePass" ? "purple" : "white",
                    color: selectedButton === "changePass" ? "white" : "black",
                  }}
                  onClick={() => handleButtonClick("changePass")}
                >
                  Change Password
                </Button>
              </div>

              <Collapse
                in={selectedButton === "edit"}
                timeout="auto"
                unmountOnExit
              >
                <h3 style={{ marginTop: "50px" }}>Update Account Details</h3>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <div style={{ flex: 1 }}>
                    <p>Email:</p>
                    <FormControl sx={{ width: "100%" }} size="small" disabled>
                      <OutlinedInput
                        id="emailAddress"
                        type="text"
                        placeholder="Enter Email"
                        value={user.email}
                      />
                    </FormControl>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p>Phone Number:</p>
                    <FormControl sx={{ width: "100%" }} size="small" disabled>
                      <OutlinedInput
                        id="phoneNumber"
                        type="text"
                        placeholder="Enter Phone Number"
                        value={user.mobileNumber}
                      />
                    </FormControl>
                  </div>
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;

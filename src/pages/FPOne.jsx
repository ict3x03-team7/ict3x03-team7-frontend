import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import FP1Image from "../assets/forgetpassword1.jpg";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FPOne(props) {
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

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  let navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/");
  };

  const gotoFPTwo = async () => {
    if (validateEmail()) {
      try {
        // log email to check
        console.log(email);

        // Make an API call to verify the email
        const response = await axios.post(
          `http://localhost:8085/api/v1/auth/${email}/verify`,
          {}
        );

        // log response
        console.log(response);

        if (
          response.status === 200 &&
          response.data.result.isVerified &&
          response.data.result.mfaEnabled
        ) {
          // Email is verified, navigate to FPTwo
          navigate("/FPTwo", { state: { email } });
        } else {
          // Handle the case where email is not verified or other errors
          console.log("Email verification failed.");
          setEmailError("Email verification failed.");
        }
      } catch (error) {
        // Handle network errors or API errors
        console.error("API Error:", error);
        setEmailError("Email verification failed.");
      }
    }
  };

  const validateEmail = () => {
    let valid = true;

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
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

        <p style={{ textAlign: "center" }}>Step 1: Enter your email</p>

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
              onInput={(e) => {
                if (e.target.value.length > 100) {
                  e.target.value = e.target.value.slice(0, 100);
                }
                setEmail(e.target.value);
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

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="medium"
            style={{ marginRight: "15px" }}
            onClick={gotoLogin}
          >
            Cancel
          </Button>

          <Button variant="contained" size="medium" onClick={gotoFPTwo}>
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default FPOne;

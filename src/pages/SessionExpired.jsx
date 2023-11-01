import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SessionExpired() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
  };

  const boxStyle = {
    padding: "20px",
    border: "1px solid grey",
    width: "50%",
    paddingTop: "30px",
    paddingBottom: "20px",
    marginBottom: "50px",
  };

  let navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <h1>Session Expired</h1>
        <p>OOPS! Your session have been expired.</p>
        <p>Please login to use the website again.</p>

        <Button
          variant="contained"
          size="medium"
          onClick={gotoLogin}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Go to Login
        </Button>
      </Paper>
    </div>
  );
}

export default SessionExpired;

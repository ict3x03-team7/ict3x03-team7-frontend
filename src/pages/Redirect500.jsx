import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function redirect500() {
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
        <h1>500 Internal Server Error</h1>
        <p>OOPS! Something went wrong on the server.</p>
        <p>
          Nobody is currently working on this issue. Please try again later.
        </p>

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

export default redirect500;

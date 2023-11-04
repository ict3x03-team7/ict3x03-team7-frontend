import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function redirect404() {
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
        <h1>404 Not Found</h1>
        <p>OOPS! We couldn't find your page. It looks like it doesnt exist.</p>
        <p>
          If you entered the URL manually, please check your spelling and try
          again.
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

export default redirect404;

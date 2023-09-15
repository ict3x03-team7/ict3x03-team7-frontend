import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Logout() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginTop: "180px",
  };

  const boxStyle = {
    padding: "20px", // Add padding to the box
    border: "1px solid grey", // Add a grey border
    width: "50%", // Set the width of the box
  };

  let navigate = useNavigate();
  const chooseLoginAccountButton = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        {/* Heading */}

        <div style={{ textAlign: "center" }}>
          <p
            style={{ margin: "0 10px", fontSize: "25px", textAlign: "center" }}
          >
            You Have Been Logged Out
          </p>

          <p style={{ marginTop: "35px", marginBottom: "35px" }}>
            Thank you for using SIT-Recipe
          </p>

          <Button
            variant="contained"
            size="medium"
            onClick={chooseLoginAccountButton}
          >
            Logged In Again
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Logout;

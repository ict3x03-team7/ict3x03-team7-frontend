import React from "react";
import Typography from "@mui/material/Typography";

const footerStyle = {
  backgroundColor: "black",
  padding: "20px",
  textAlign: "center",
};

const textStyle = {
  color: "white",
  fontFamily: "Roboto, sans-serif", // Set the font to Roboto
};

function Footer() {
  return (
    <div style={footerStyle}>
      <Typography variant="body1" style={textStyle}>
        Copyright © 2023 Singapore Institute of Technology. All Rights Reserved
        to Group 7.
      </Typography>
    </div>
  );
}

export default Footer;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import googleauthenticator from "../assets/googleauthenticator.jpg";

function Enable2FA(props) {
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

  const location = useLocation();
  const get_MFA = location.state.get_MFA;

  const [qrScanned, setQrScanned] = useState(false);

  let navigate = useNavigate();

  const gotoLogin = () => {
    if (qrScanned) {
      const userConfirmed = window.confirm(
        "Are you sure you have scanned the QR Code?"
      );
      if (userConfirmed) {
        navigate("/");
      } else {
        alert("Please scan the QR Code");
      }
    } else {
      alert("Please scan the QR Code");
    }
  };

  return (
    <div style={containerStyle}>
      <Paper style={boxStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
          <img
            src={googleauthenticator}
            style={{ width: "70px" }}
            alt="Authenticator Logo"
          />
          <p style={{ margin: "0 10px", fontSize: "25px" }}>Scan Your 2FA</p>
          <hr style={{ flex: "1", borderTop: "1px solid grey" }} />
        </div>

        <div>
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
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
            to download Authenticator App, and use this to scan the QR Code to
            get your OTP.
          </p>

          <p style={{ textAlign: "center" }}>
            This will be use for future logins!
          </p>

          <img
            src={get_MFA}
            style={{ width: "50%", display: "block", margin: "0 auto" }}
            alt="2FA QR Code"
          />

          {/* checkbox to check if user scanned the qr */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              checked={qrScanned}
              onChange={() => setQrScanned(!qrScanned)}
            />
            <label style={{ marginLeft: "10px" }}>
              I have scanned the QR Code already
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={gotoLogin}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Enable2FA;

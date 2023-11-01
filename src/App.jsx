import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./css/style.css"; // Import your custom CSS here
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import LoginStudentStaff from "./pages/LoginStudentStaff";
import LoginVerification from "./pages/LoginVerification";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import SearchRecipeResults from "./pages/SearchRecipeResults";
import FPOne from "./pages/FPOne";
import FPTwo from "./pages/FPTwo";
import FPThree from "./pages/FPThree";
import Enable2FA from "./pages/Enable2FA";
import Redirect404 from "./pages/Redirect404";
import Redirect500 from "./pages/Redirect500";
import SessionExpired from "./pages/SessionExpired";

const appStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "white", // Set the background color to white
  color: "black",
};

const contentStyle = {
  flex: "1",
  margin: "30px",
  marginTop: "130px", // Adjust this margin to leave space for the Navbar
  fontFamily: "Roboto, sans-serif", // Set the font to Roboto
};

const footerStyle = {
  marginTop: "auto", // Push the Footer to the bottom
};

const App = () => {
  return (
    <BrowserRouter>
      <div style={appStyle} className="App">
        <Navbar />

        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/LoginStudentStaff" element={<LoginStudentStaff />} />
            <Route path="/LoginVerification" element={<LoginVerification />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Enable2FA" element={<Enable2FA />} />

            <Route path="/FPOne" element={<FPOne />} />
            <Route path="/FPTwo" element={<FPTwo />} />
            <Route path="/FPThree" element={<FPThree />} />

            <Route path="/Redirect404" element={<Redirect404 />} />
            <Route path="/Redirect500" element={<Redirect500 />} />
            <Route path="/SessionExpired" element={<SessionExpired />} />

            <Route path="/Recipes" element={<Recipes />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Logout" element={<Logout />} />

            <Route
              path="/SearchRecipeResults"
              element={<SearchRecipeResults />}
            />
          </Routes>
        </div>

        <Footer style={footerStyle} />
      </div>
    </BrowserRouter>
  );
};

export default App;

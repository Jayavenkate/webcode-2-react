import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { MovieBooking } from "./MovieBooking";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { ForgetPass } from "./ForgetPass";
import { VerifyOtp } from "./VerifyOtp";
import { SetPassword } from "./SetPassword";
import { Home } from "./Home";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="app-bar">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BOOK MY SHOW
            </Typography>
            {/* <Button color="inherit" onClick={() => navigate("/moviebooking")}>
              SignUp
            </Button> */}
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviebooking" element={<MovieBooking />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgetpassword" element={<ForgetPass />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/setpassword" element={<SetPassword />} />
      </Routes>
    </div>
  );
}

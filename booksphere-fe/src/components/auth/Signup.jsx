import { Button, CircularProgress, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpAPI } from "../../utils/authApi";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [creator, setCreator] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!isValidEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(false);
      }
    }
    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
      } else {
        setPasswordError(false);
      }
    }
    if (name === "name") {
      if (value.length < 4) {
        setNameError("Name must be at least 4 characters long.");
      } else {
        setNameError(false);
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = async () => {
    console.log(userInfo);
    if (
      userInfo.email == "" ||
      userInfo.password == "" ||
      userInfo.name == ""
    ) {
      alert("Fields cannot be empty");
      return;
    }
    try {
      
      
      setLoader(true);
      let data;
      if(creator){
        console.log("im here");
         data={
          ...userInfo,
          role:"creator"
        }
      }else{
        data=userInfo
      }
      console.log(userInfo)
      const res = await signUpAPI(data);
      console.log(res);
      if(res.status=="success"){
        navigate("/login")
      }
    } catch (error) {
      alert("Something went wrong, see console for detail");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="login-container">
      <section className="login-box">
        <h3>Create an account</h3>
        <form>
          <TextField
            fullWidth
            error={nameError}
            helperText={nameError}
            id="signup-name"
            label="Name"
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChanges}
            required
          />
          <TextField
            fullWidth
            error={emailError}
            helperText={emailError}
            id="login-email"
            label="Email"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChanges}
            required
          />
          <TextField
            fullWidth
            error={passwordError}
            helperText={passwordError}
            id="login-password"
            label="Password"
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChanges}
            required
          />
          <p>
            Do you want an creator account?{" "}
            <Switch
              checked={creator}
              onChange={(e) => setCreator(e.target.checked)}
            />
          </p>
          <Button
            onClick={handleAuth}
            variant="contained"
            sx={{ "&:focus": { outline: "none" } }}
            disabled={emailError || passwordError || nameError}
          >
            {loader ? <CircularProgress size={20} color="inherit" /> : "login"}
          </Button>
          <p>
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;

import { Button, CircularProgress, TextField } from "@mui/material";

import React, { useState } from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../utils/authApi";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  

  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === "email" ) {
      if(!isValidEmail(value)){
        setEmailError("Please enter a valid email address.");
      }else {
      setEmailError(false);
      }
    }
    if (name === "password" ) {
      if(value.length < 6){
        setPasswordError("Password must be at least 6 characters long.");
      }else {
      setPasswordError(false);
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleAuth = async ()=>{
    console.log(userInfo)
    if(userInfo.email==""||userInfo.password==""){
      alert('Fields cannot be empty');
      return;
    }
    try {
      setLoader(true)
      const res = await loginAPI(userInfo)
      console.log(res)
      if(res.status=="success"){
        console.log("in success");
        navigate("/books")
      }
      
    } catch (error) {
      alert('Something went wrong, see console for detail');
      console.log(error)
    }finally{
      setLoader(false)
    }
  }
  return (
    <div className="login-container">
      <section className="login-box">
        <h3>Login</h3>
        <form>
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
          <Button
            onClick={handleAuth}
            variant="contained"
            sx={{ "&:focus": { outline: "none" } }}
            disabled={emailError||passwordError}
            
          >
            {loader ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "login"
            )}
          </Button>
          <p>Don't have an account? <Link to={"/signup"}>Signup here</Link></p>

        </form>
      </section>
    </div>
  );
};

export default Login;

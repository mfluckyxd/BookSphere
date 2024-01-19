import { apiURL } from "./config";
import axios from "axios";

export const loginAPI = async (userInfo) => {
  try {
    const res = await axios.post(`${apiURL}/auth/login`, userInfo);
    localStorage.setItem("authToken", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.userId);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const signUpAPI = async (userInfo) => {
  try {
    console.log(userInfo)
    const res = await axios.post(`${apiURL}/auth/signup`, userInfo);
    
    return res.data;
  } catch (error) {
    return error;
  }
};

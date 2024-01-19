import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import BooksDashboard from "./components/books/BooksDashboard";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/books" element={<ProtectedRoute Component={<BooksDashboard/>}/>}/>
      </Routes>
      
       
      </BrowserRouter>
    </>
  );
}

export default App;

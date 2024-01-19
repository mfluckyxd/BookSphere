import React from "react";
import backgroundImage from "../assets/main-bg.jpg";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const containerStyle = {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  const navigate = useNavigate();

  return (
    <div className="home-container" style={containerStyle}>
      <div class="main-container">
        <div className="mid-section">
          <div className="main-text">
            <h2>Welcome to BookSphere</h2>
            <p>Explore Endless Worlds of Knowledge with Booksphere.</p>
          </div>
          <div className="main-btns">
            <button onClick={()=>navigate("/login")}>login</button>
            <button onClick={()=>navigate("/signup")}>signup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

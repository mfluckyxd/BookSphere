import React, { useState } from "react";
import AddBook from "./AddBook";
import BooksList from "./BooksList";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
// import "../../styles/dashboard.css";
import "../../styles/dashboard.css"


const BooksDashboard = () => {
  const creator = localStorage.getItem("role") == "creator";
  const [updateTrigger, setUpdateTrigger] = useState(1);

  const [currentPage, setCurrentPage] = useState("allBooks");
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar">
        <div className="leftNav">
          {creator && (
            <Button
              variant="contained"
              color="success"
              onClick={() => setCurrentPage("addBook")}
            >
              Add a Book
            </Button>
          )}
        </div>
        <div className="midNav">
          <Button
          size="small"
            variant={currentPage == "allBooks" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("allBooks")}
          >
            All Books
          </Button>
          <Button
          size="small"
            variant={currentPage == "recentBooks" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("recentBooks")}
          >
            Recently Added Books
          </Button>
          <Button
          size="small"
            variant={currentPage == "oldBooks" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("oldBooks")}
          >
            Old Books
          </Button>
        </div>
        <div className="rightNav">
          <Button variant="contained" color="error" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      </nav>

      {creator && currentPage == "addBook" ? (
        <AddBook
          setUpdateTrigger={setUpdateTrigger}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <BooksList updateTrigger={updateTrigger} currentPage={currentPage} />
      )}
    </div>
  );
};

export default BooksDashboard;

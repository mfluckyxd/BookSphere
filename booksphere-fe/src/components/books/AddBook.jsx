import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { addBookAPI } from "../../utils/booksApi";

const AddBook = ({setUpdateTrigger,setCurrentPage}) => {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    description: "",
    bookUrl: "",
  });
  
  const [errors, setErrors] = useState({
    title: false,
    author: false,
    description: false,
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setErrors((prevState) => ({
      ...prevState,
      [name]: value == "" ? true : false,
    }));
    setBookInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitBook = async () => {
    console.log(bookInfo);
    if (
      bookInfo.title == "" ||
      bookInfo.author == "" ||
      bookInfo.description == ""
    ) {
      alert("Required fields can't be empty");
      return;
    }
    try {
      const res = await addBookAPI(bookInfo);
      console.log(res);
      if (res.status == "success") {
        alert("book added succesfully");
        setUpdateTrigger(prevState=>prevState+1);
        setBookInfo({
          title: "",
          author: "",
          description: "",
          image: "",
          bookUrl: "",
        });
        setCurrentPage("recentBooks")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-book-container">
      <h3>Publish a book</h3>
      <form>
        <TextField
          
          error={errors.title}
          helperText={errors.title?"This field is required":""}
          id="newbook-title"
          label="Title"
          type="text"
          name="title"
          value={bookInfo.title}
          onChange={handleChanges}
          required
        />
        <TextField
          
          error={errors.author}
          helperText={errors.author?"This field is required":""}
          id="newbook-title"
          label="Author"
          type="text"
          name="author"
          value={bookInfo.author}
          onChange={handleChanges}
          required
        />
        <TextField
          
          error={errors.description}
          helperText={errors.description?"This field is required":""}
          id="newbook-description"
          label="Description"
          type="text"
          name="description"
          value={bookInfo.description}
          onChange={handleChanges}
          required
        />
        <TextField
          
          id="newbook-bookUrl"
          label="Book URL"
          type="text"
          name="bookUrl"
          value={bookInfo.bookUrl}
          onChange={handleChanges}
        />
        

        <Button variant="contained" onClick={submitBook}>
          Submit Book
        </Button>
      </form>
    </div>
  );
};

export default AddBook;

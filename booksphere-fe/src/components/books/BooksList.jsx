import React, { useEffect, useState } from "react";
import { deleteBookAPI, getBooksAPI } from "../../utils/booksApi";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const BooksList = ({ updateTrigger,currentPage }) => {
  const [bookData, setBookData] = useState([]);
  const [loader, setLoader] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchBooks = async () => {
    try {
      setLoader(true);
      
      
       const res = await getBooksAPI(currentPage);
      
        
      if (res.status == "success") {
        console.log(res);
        setBookData(res.data);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const deleteBook = async (bookId) => {
    console.log(bookId);
    try {
        const res = await deleteBookAPI(bookId)
        if(res.status=="successful"){
            fetchBooks();
        }
    } catch (error) {
        console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [updateTrigger,currentPage]);
  return (
    <div className="booklist-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Book URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookData?.map((book, i) => (
            <TableRow
              key={book?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar>{i + 1}</Avatar>
              </TableCell>
              <TableCell align="right">{book?.title}</TableCell>
              <TableCell align="right">{book?.description}</TableCell>
              <TableCell align="right">{book?.author}</TableCell>
              <TableCell align="right">
                {book.creator == userId ? (
                  <button onClick={() => deleteBook(book?._id)}>
                    Delete Book
                  </button>
                ) : (
                    <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">Read Book</a>

                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BooksList;

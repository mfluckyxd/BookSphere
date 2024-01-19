import React, { useState } from 'react'
import AddBook from './AddBook';
import BooksList from './BooksList';
import { useNavigate } from 'react-router-dom';

const BooksDashboard = () => {
  const creator = localStorage.getItem("role")=="creator";
  const [updateTrigger, setUpdateTrigger] = useState(1)

  const [currentPage, setCurrentPage] = useState("allBooks")
  const navigate = useNavigate()
  
  const logoutUser = ()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate("/")

  }
  return (
    <div>
      {creator&&<button className={currentPage=="addBook"?"active":""} onClick={()=>setCurrentPage("addBook")}>Add a Book</button>}
      <button className={currentPage=="allBook"?"active":""} onClick={()=>setCurrentPage("allBooks")}>All Books</button>
      <button className={currentPage=="recentBooks"?"active":""} onClick={()=>setCurrentPage("recentBooks")}>Recently Added Books</button>
      <button className={currentPage=="oldBooks"?"active":""} onClick={()=>setCurrentPage("oldBooks")}>Old Books</button>
      <button onClick={logoutUser}>Logout</button>
      {(creator&&currentPage=="addBook")?<AddBook setUpdateTrigger={setUpdateTrigger} setCurrentPage={setCurrentPage}/>:
      <BooksList updateTrigger={updateTrigger} currentPage={currentPage} />}
    </div>
  )
}

export default BooksDashboard
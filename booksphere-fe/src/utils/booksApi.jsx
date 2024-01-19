import { apiURL } from "./config";
import axios from "axios";



export const addBookAPI = async (bookInfo) => {
    const authToken = localStorage.getItem("authToken");
  try {
    const res = await axios.post(`${apiURL}/books/create`, bookInfo, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getBooksAPI = async (filter)=>{
    const authToken = localStorage.getItem("authToken");
    let queryParams = {};

  if (filter === "recentBooks") {
    queryParams = { new: 1 };
  } else if (filter === "oldBooks") {
    queryParams = { old: 1 };
  }
    try {
        const res = await axios.get(`${apiURL}/books`,{
            headers: {
              'Authorization': `Bearer ${authToken}`
            },
            params: queryParams,
          })
          
        return res.data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const deleteBookAPI = async (id)=>{
    const authToken = localStorage.getItem("authToken");
    const headers = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    try {
        const res = await axios.delete(`${apiURL}/books/delete/${id}`,headers)
        return res.data;
    } catch (error) {
        return error
    }
}

import React, { useEffect, useState } from "react";
import "../src/styles/styles.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [plan, setPlan] = useState("");
  const [edit, setEdit] = useState("");
  const [del,setDel] = useState("")
  useEffect(() => {
    const getAlldata = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}`);
        const Data = res.data;
        setData(Data);
        console.log(Data); // Log the data after setting it
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    getAlldata();
  }, []); // Empty dependency array to run only once

  const getOneData = async (id) => {
    try {
      const oneD = await axios.get(`${import.meta.env.VITE_BACKEND_API}/${id}`);
      const disd = oneD.data;
      console.log(disd);
      return disd;
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const postData = async () => {
    const new_obj = { name: name, age: age, plan: plan };
    try {
      const posting = await axios.post(`${import.meta.env.VITE_BACKEND_API}`, new_obj);
      const newD = posting.data;
      console.log(newD);
      setData((prevData) => [...prevData, newD]);
    } catch (error) {
      console.error("Post error: ", error);
    }
  };

  const editData = async (id) => {
    const new_obj = { name: name, age: age, plan: plan };
    try {
      const editing = await axios.put(`${import.meta.env.VITE_BACKEND_API}/${id}`, new_obj);
      const editedData = editing.data;
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? editedData : item))
      );
      console.log(editedData);
    } catch (error) {
      console.error("Edit error: ", error);
    }
  };
  
  const deleteData = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/${id}`)
    const response = res.data
    setData((prevData) => prevData.filter((item) => item._id != id))
    console.log("hi")

  }



  return (
    <div className="body">
      <h1>Data from API</h1>
      {data.length > 0 ? (
        <div>
          <div className="search">
            <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="age" onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="plan" onChange={(e) => setPlan(e.target.value)} />
            <button onClick={postData}>Add</button>
          </div>
          <ul>
            <div className="info">
              {data.map((item) => (
                <div key={item._id} className="individual" onClick={() => setEdit(item._id)}>
                  <li>Name: {item.name}</li>
                  <li>Age: {item.age}</li>
                  <li>Plan: {item.plan}</li>
                  <MdDelete onClick={() => {deleteData(item._id)}} />
                </div>
              ))}
            </div>
          </ul>
          <div>
            <h1>Edit</h1>
            <div>
              <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
              <input type="number" placeholder="age" onChange={(e) => setAge(e.target.value)} />
              <input type="text" placeholder="plan" onChange={(e) => setPlan(e.target.value)} />
              <button onClick={() => editData(edit)}>Edit</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

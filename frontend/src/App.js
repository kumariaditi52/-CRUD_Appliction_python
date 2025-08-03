import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL = "http://127.0.0.1:5000/data";

  const [dataList, setDataList] = useState([]);
  const [dataType, setDataType] = useState("List");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setDataList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add or Update data
  const handleSubmit = async () => {
    if (content.trim() === "") {
      alert("Please enter some content");
      return;
    }

    if (editId) {
      // Update existing record
      await axios.put(`${API_URL}/${editId}`, {
        data_type: dataType,
        content: content,
      });
      setEditId(null);
    } else {
      // Add new record
      await axios.post(API_URL, {
        data_type: dataType,
        content: content,
      });
    }

    setContent("");
    fetchData();
  };

  // Delete data
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    }
  };

  // Edit data
  const handleEdit = (item) => {
    setEditId(item.id);
    setDataType(item.data_type);
    setContent(item.content);
  };

  return (
    <div className="container">
      <h1>Data Structures CRUD</h1>

      <div className="form-control">
        <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option value="List">List</option>
          <option value="Tuple">Tuple</option>
          <option value="Set">Set</option>
          <option value="Dictionary">Dictionary</option>
        </select>
        <input
          type="text"
          value={content}
          placeholder="Enter data"
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="add" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Type</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.data_type}</td>
              <td>{item.content}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(item)}>
                  ✏️ Edit
                </button>
                <button className="delete" onClick={() => handleDelete(item.id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
          {dataList.length === 0 && (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

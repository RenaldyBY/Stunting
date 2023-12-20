import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChildList = () => {
  const [childList, setChildList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/children");

        // Jika respons memiliki struktur data yang benar
        if (Array.isArray(response?.data)) {
          setChildList(response.data);
        } else {
          console.error(
            "Child data is not in the expected format:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching child data:", error.message);
      } finally {
        setLoading(false);
        // Set a delay of 1 second before displaying the content
        setTimeout(() => {
          setShowSpinner(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/children/${id}`);
      setChildList((prevList) => prevList.filter((child) => child.id !== id));
    } catch (error) {
      console.error("Error deleting child data:", error.message);
    }
  };

  return (
    <div className="container h-screen px-10 mx-auto mt-10 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Data Anak</h2>
        <Link to="/add" className="px-4 py-2 text-white bg-blue-500 rounded">
          Tambah
        </Link>
      </div>

      {childList.length === 0 ? (
        <p>No child data available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-600 text-secondary">
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Gender</th>
              <th className="p-2 border-b">Age</th>
              <th className="p-2 border-b">Height (cm)</th>
              <th className="p-2 border-b">Weight (kg)</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {childList.map((child, index) => (
              <tr className="text-center" key={index}>
                <td className="p-2 border-b">{child.name}</td>
                <td className="p-2 border-b">{child.gender}</td>
                <td className="p-2 border-b">{child.age}</td>
                <td className="p-2 border-b">{child.height}</td>
                <td className="p-2 border-b">{child.weight}</td>
                <td className="p-2 border-b">
                  <Link
                    to={`/edit/${child.id}`}
                    className="mr-2 text-blue-500 font-poppins"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(child.id)}
                    className="text-red-500 cursor-pointer font-poppins"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChildList;

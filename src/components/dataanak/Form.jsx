import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrlAnak = "http://localhost:3001/anak";
const apiUrlProfil = "http://localhost:3003/profil";

const Form = ({ setGroupedData }) => {
  const [formData, setFormData] = useState({
    token: "", // Add the token field
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [childNames, setChildNames] = useState([]);

  useEffect(() => {
    const fetchChildNames = async () => {
      try {
        // Retrieve token from cookie using js-cookie
        const token = Cookies.get("authToken");

        // Set token in form data
        setFormData((prevFormData) => ({ ...prevFormData, token }));

        // Set token in axios defaults
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch profiles with the authorized request
        const response = await axios.get(apiUrlProfil);
        console.log("Response from server:", response);

        // Check if response.data is an array and has items
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Find the profile with the matching token
          const matchingProfile = response.data.find(
            (profile) => profile.token === token
          );

          // Check if a matching profile is found
          if (matchingProfile) {
            // Set child names based on the matching profile's children
            const childNames = matchingProfile.children.map(
              (child) => child.childName
            );

            setChildNames(childNames);
            console.log("Child names set:", childNames);
          } else {
            console.log("No matching profile found");
          }
        } else {
          console.log("No profil data found");
        }
      } catch (error) {
        console.error("Error fetching child names:", error);
      }
    };

    fetchChildNames();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrlAnak, formData);
      const responseGet = await axios.get(apiUrlAnak);
      setGroupedData(responseGet.data);
      setAlertMessage("Data berhasil ditambahkan!");
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 1000);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-semibold">Form Pertumbuhan Anak</h1>
      {alertMessage && (
        <div className="absolute p-4 font-semibold text-white bg-green-500 right-5 top-10">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nama Anak
          </label>
          <select
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          >
            <option value="">Pilih Nama Anak</option>
            {childNames.map((childName, index) => (
              <option key={index} value={childName}>
                {childName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-600"
          >
            Umur Anak
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-600"
          >
            Tinggi Anak (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-600"
          >
            Berat Anak (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">
          Simpan Data
        </button>
      </form>
    </div>
  );
};

export default Form;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";

const EditChildForm = () => {
  const { id } = useParams(); // Get the child ID from the URL
  const [childData, setChildData] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/children/${id}`
        );
        setChildData(response.data);
      } catch (error) {
        console.error("Error fetching child data:", error.message);
      }
    };

    fetchChildData();
  }, [id]);

  const validateForm = () => {
    let validationErrors = {};

    for (const field in childData) {
      if (typeof childData[field] === "string" && !childData[field].trim()) {
        validationErrors[field] = `Please enter the ${field}`;
      } else if (
        (field === "age" || field === "height" || field === "weight") &&
        isNaN(childData[field])
      ) {
        validationErrors[field] = `Please enter a valid ${field}`;
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        setLoading(true);

        // Use a PUT request for updating data
        await axios.put(`http://localhost:3000/children/${id}`, childData);

        // Simulate a delay to show the spinner
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Swal.fire({
          icon: "success",
          title: "Child Data Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect to the monitoring page after successful update
        setTimeout(() => {
          window.location.href = "/dataanak";
        }, 2000);

        try {
          // kode untuk memperbarui data anak
        } catch (error) {
          console.error("Kesalahan saat memperbarui data anak:", error);
        }

        Swal.fire({
          icon: "error",
          title: "Failed to Update Child Data",
          text: "Please try again",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setChildData({
      ...childData,
      [field]: value,
    });
  };

  return (
    <div className="max-w-md p-4 mx-auto mt-8 bg-gray-100 rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Edit Child Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={childData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Gender:
          </label>
          <div className="mt-1">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={childData.gender === "Male"}
              onChange={() => handleChange("gender", "Male")}
              className="mr-2"
              required
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={childData.gender === "Female"}
              onChange={() => handleChange("gender", "Female")}
              className="mr-2"
              required
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-gray-600"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={childData.age}
            onChange={(event) => handleChange("age", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's age"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-semibold text-gray-600"
          >
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            value={childData.height}
            onChange={(event) => handleChange("height", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's height"
          />
          {errors.height && (
            <p className="text-sm text-red-500">{errors.height}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-semibold text-gray-600"
          >
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            value={childData.weight}
            onChange={(event) => handleChange("weight", event.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter child's weight"
          />
          {errors.weight && (
            <p className="text-sm text-red-500">{errors.weight}</p>
          )}
        </div>

        <Button
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
          colorScheme="blue"
          size="lg"
          rounded="md"
          isLoading={loading}
          loadingText={
            <>
              Updating Data...
              {loading && <Spinner ml="3" color="white" size="sm" />}
            </>
          }
        >
          Update Data
        </Button>
      </form>
    </div>
  );
};

export default EditChildForm;

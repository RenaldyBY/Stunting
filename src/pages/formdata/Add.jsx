import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const AddChildForm = () => {
  const [childData, setChildData] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};

    for (const field in childData) {
      if (!childData[field].trim()) {
        validationErrors[field] = `Please enter the ${field}`;
      } else if (field === "age" && isNaN(childData[field])) {
        validationErrors[field] = "Please enter a valid age";
      } else if (field === "height" && isNaN(childData[field])) {
        validationErrors[field] = "Please enter a valid height";
      } else if (field === "weight" && isNaN(childData[field])) {
        validationErrors[field] = "Please enter a valid weight";
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      try {
        setLoading(true);
        // Simulate a delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Perform the registration logic
        const response = await axios.post(
          "http://localhost:3000/children",
          childData
        );

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Child Data Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          // Reset the form after successful registration
          setChildData({
            name: "",
            gender: "",
            age: "",
            height: "",
            weight: "",
          });
          setTimeout(() => {
            window.location.href = "/dataanak";
          }, 2000);
        } else {
          // Display an error message if the registration fails
          Swal.fire({
            icon: "error",
            title: "Failed to Add Child Data",
            text: "Please try again",
          });
        }
      } catch (error) {
        // Display an error message if an unexpected error occurs
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "An error occurred",
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] p-4 bg-gray-100 rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">Tambahkan data anak</h2>
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
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
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
            loadingText="Adding Child Data..."
          >
            Tambahkan data
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddChildForm;

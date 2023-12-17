// src/components/DataForm.js
import React, { useState } from "react";

const DataForm = ({ onAddData }) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleAddData = () => {
    const newData = {
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
    };
    onAddData(newData);
    setAge("");
    setHeight("");
    setWeight("");
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Add New Growth Data</h2>
      <div className="flex mb-4">
        <label className="mr-4">Age (years): </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border"
        />
      </div>
      <div className="flex mb-4">
        <label className="mr-4">Height (cm): </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="p-2 border"
        />
      </div>
      <div className="flex mb-4">
        <label className="mr-4">Weight (kg): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="p-2 border"
        />
      </div>
      <button
        onClick={handleAddData}
        className="px-4 py-2 text-white bg-blue-500"
      >
        Add Data
      </button>
    </div>
  );
};

export default DataForm;

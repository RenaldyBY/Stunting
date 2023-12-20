// src/components/DataTable.js
import React from "react";

const DataTable = ({ data, onDeleteData }) => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Growth Data</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Age</th>
            <th className="px-4 py-2 border-b">Height (cm)</th>
            <th className="px-4 py-2 border-b">Weight (kg)</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.age}>
              <td className="px-4 py-2 border-b">{item.age}</td>
              <td className="px-4 py-2 border-b">{item.height}</td>
              <td className="px-4 py-2 border-b">{item.weight}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onDeleteData(item.age)}
                  className="px-2 py-1 text-white bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

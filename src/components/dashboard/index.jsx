import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Profil from "../profil/ProfilCard";
import Chart from "./GrowthChart";

const Dashboard = () => {
  const [anakData, setAnakData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from cookie
        const token = Cookies.get("authToken");

        // Set token in axios defaults
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch data with the authorized request
        const response = await axios.get("http://localhost:3001/anak");
        console.log("API Response:", response.data);

        // Filter data based on the token
        const filteredData = response.data.filter(
          (anak) => anak.token === token
        );

        setAnakData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar fungsi hanya dijalankan sekali saat mount

  return (
    <div className="container mx-auto mt-8">
      <Profil />
      <h1 className="mb-4 text-4xl font-bold">Stunting Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {anakData && anakData.length > 0 ? (
          anakData.map((anak) => (
            <div key={anak.id} className="p-4 bg-white rounded-md shadow-md">
              <h2 className="mb-2 text-lg font-semibold">{anak.name}</h2>
              <p>Age: {anak.age} years</p>
              <p>Height: {anak.height} cm</p>
              <p>Weight: {anak.weight} kg</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;

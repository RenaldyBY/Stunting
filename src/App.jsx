// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./components/Loginform/Login";
import Register from "./components/Loginform/Register";
import Calculate from "./pages/calculate/index";
import Article from "./pages/article/index";
import EditData from "./pages/formdata/edit";
import AddData from "./pages/formdata/Add";
import DataAnak from "./pages/dataanak/index";
import Spinner from "./components/spinner/spinner";
import About from "./pages/aboutpages/index";
import Tns from "./pages/tns/index";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/article" element={<Article />} />
            <Route path="/dataanak" element={<DataAnak />} />
            <Route path="/tns" element={<Tns />} />
            <Route path="/add" element={<AddData />} />
            <Route path="/edit/:id" element={<EditData />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;

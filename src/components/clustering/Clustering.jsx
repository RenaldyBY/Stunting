import React, { useState } from "react";

const Stepper = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <Hero />
      <div className="p-4 bg-yellow-300">
        <p className="text-sm text-yellow-800">
          Anda dapat melihat golongan di bagian calculator atau data anak
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex ml-4">
          <a
            className={`flex items-center justify-center w-32 h-32 p-4 text-center border rounded-md cursor-pointer hover:bg-blue-500 hover:text-secondary font-poppins ${
              activeIndex === 1 ? "bg-blue-500 text-secondary" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            Golongan 1
          </a>
        </div>
        <div className="flex ml-4">
          <a
            className={`flex items-center justify-center w-32 h-32 p-4 text-center border rounded-md cursor-pointer hover:bg-blue-500 hover:text-secondary font-poppins ${
              activeIndex === 2 ? "bg-blue-500 text-secondary" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            Golongan 2
          </a>
        </div>
        <div className="flex ml-4">
          <a
            className={`flex items-center justify-center w-32 h-32 p-4 text-center border rounded-md cursor-pointer hover:bg-blue-500 hover:text-secondary font-poppins ${
              activeIndex === 3 ? "bg-blue-500 text-secondary" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            Golongan 3
          </a>
        </div>
        <div className="flex ml-4">
          <a
            className={`flex items-center justify-center w-32 h-32 p-4 text-center border rounded-md cursor-pointer hover:bg-blue-500 hover:text-secondary font-poppins ${
              activeIndex === 4 ? "bg-blue-500 text-secondary" : ""
            }`}
            onClick={() => handleClick(4)}
          >
            Golongan 4
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stepper;

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] ">
      <div>
        <h1
          className="p-3 text-4xl text-center lg:text-8xl md:text-6xl text-black1 font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Tips & Saran
        </h1>
      </div>

      <div className="mt-2 w-[800px]  lg:w-[900px] mx-auto p-2 ">
        <p className="text-[#6B7280] text-center font-sans  text-lg lg:text-xl">
          Kumpulan tips dan saran berdasarkan penggolongan kondisi anak ini
          merupakan langkah awal untuk memantau dalam pencegahan stunting pada
          anak, tetap konsultasikan pada dokter profesional.
        </p>
      </div>
      <div className="flex justify-between space-x-4 font-poppins">
        <button className="px-3 py-2 border-2 rounded-md border-black1 text-black1">
          Protect now
        </button>
      </div>
    </div>
  );
};

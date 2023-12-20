import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-Ellips">
      <div>
        <h1
          className="p-3 text-4xl text-center lg:text-8xl md:text-6xl text-black1 font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Let's ProtectTogether
        </h1>
      </div>

      <div className="mt-2  lg:w-[800px] mx-auto p-2 ">
        <p className="text-[#6B7280] text-center font-sans text-lg lg:text-2xl">
          Here at flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>
      <div className="flex justify-between space-x-4 font-poppins">
        <button className="px-3 py-2 text-white bg-purple-700 rounded-md">
          Get Start
        </button>
        <button className="px-3 py-2 border-2 rounded-md border-black1 text-black1">
          Protect now
        </button>
      </div>
    </div>
  );
};

export default Hero;

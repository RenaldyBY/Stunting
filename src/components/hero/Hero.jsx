import React from "react";
import Bgcover from "../../assets/hero.png";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${Bgcover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h1
          className="p-3 text-4xl text-center lg:text-8xl md:text-7xl text-secondary font-poppins"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Let's ProtectTogether
        </h1>
      </div>

      <div className="mt-2  lg:w-[800px] mx-auto p-2 ">
        <p
          className="pb-5 text-lg font-semibold text-center text-secondary lg:text-2xl"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 10)" }}
        >
          Selamat datang di Stuntguard Temukan informasi terkini tentang
          pencegahan stunting dan perawatan anak-anak. Dapatkan tips gizi dan
          panduan kesehatan untuk mendukung pertumbuhan optimal. Bergabunglah
          dalam upaya menciptakan masa depan sehat untuk generasi mendatang.
          Selamat membaca!
        </p>
      </div>
      <div className="flex justify-between space-x-4 font-poppins">
        <button className="px-3 py-2 text-white bg-purple-700 rounded-md">
          Get Start
        </button>
        <button
          className="px-3 py-2 border-2 rounded-md border-secondary text-secondary"
          style={{
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          Protect now
        </button>
      </div>
    </div>
  );
};

export default Hero;

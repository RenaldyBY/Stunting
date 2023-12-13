import React, { useEffect } from "react";
import { Teams } from "./Teams";
import AOS from "aos";
import "aos/dist/aos.css";

const Allteams = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      easing: "ease-in-out", // Fungsi penurunan nilai (cubic-bezier)
    });
  }, []);
  return (
    <div className="h-auto pb-10 bg-slate-400 ">
      <div className="pt-5 text-center font-poppins">
        <h1 className="text-xl ">Our teams</h1>
        <h1 className="pt-10 text-5xl">Our Professional Teams</h1>
      </div>

      <div className="flex flex-wrap justify-around gap-4 px-5 mt-10 ">
        {Teams.map((team, index) => (
          <div key={index} className="team-card">
            <div
              data-aos="flip-left"
              className="max-w-md overflow-hidden bg-white rounded-md shadow-lg w-[210px] h-[294px]"
            >
              <img
                className="object-cover w-full"
                src={team.image}
                alt={team.name}
              />
            </div>
            <div className="flex-shrink-0 w-40 h-20 p-2 ml-4 -mt-10 transform bg-white rounded-lg ">
              <div
                data-aos="zoom-in-up"
                className="mb-2 font-bold text-md font-poppins"
              >
                {team.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allteams;

import React from "react";
import "aos/dist/aos.css";
import ContentHome from "../../components/content/Contenthome";
import Ques from "../../components/Q&A/ques";
import { Allteams } from "../../components/Team/Allteams";
import Hero from "../../components/hero/Hero.jsx";
const Index = () => {
  return (
    <div>
      <Hero />
      <ContentHome />
      <Ques />
      <Allteams />
    </div>
  );
};

export default Index;

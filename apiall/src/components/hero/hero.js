import React from "react";
import "../hero/hero.css";

const Hero = ({ title, text, img = "", className }) => {
  return (
    <div className={className} style={{ backgroundImage: img }}>
      <h1>{title}</h1>
      <span>{text}</span>
    </div>
  );
};

export default Hero;

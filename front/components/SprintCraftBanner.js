import React from "react";
import "./SprintCraftBanner.css";
import boardImage from "../assets/background.jpeg"; // ton image hexagonale

export default function SprintCraftBanner() {
  return (
    <div className="banner">
      <div className="circle">
        <img src={boardImage} alt="Scrum board" />
      </div>

    </div>
  );
}

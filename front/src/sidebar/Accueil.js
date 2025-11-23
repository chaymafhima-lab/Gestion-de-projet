import React from "react";
import { FaHome ,FaUserTie, FaTasks, FaClock } from "react-icons/fa";
import "./Accueil.css";



export default function Accueil() {
  return (
    <div className="accueil">
      <h1><FaHome style={{ marginRight: "8px" }} />Bienvenue sur Scrum Dashboard</h1>

      {/* Sprint Overview */}
      <section className="sprint-overview">
        <h2><FaClock /> Sprint actuel</h2>
        <p>Sprint 1: Du 13 Août au 23 Août</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: "60%" }}></div>
        </div>
        <p>60% terminé</p>
      </section>

      {/* Team Members */}
      <section className="team-overview">
        <h2><FaUserTie /> Équipe</h2>
        <ul>
          <li>Chayma - Product Owner</li>
          <li>Ali - Scrum Master</li>
          <li>Leila - Développeuse</li>
          <li>Omar - Développeur</li>
        </ul>
      </section>

      {/* Tasks Summary */}
      <section className="tasks-summary">
        <h2><FaTasks /> Tâches</h2>
        <p>12 tâches en cours, 8 terminées, 5 en retard</p>
      </section>
    </div>
  );
}

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome,FaTasks,FaRegUserCircle } from "react-icons/fa";
import "./Dashboard.css";
import { AiOutlineTeam } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { DiScrum } from "react-icons/di";



export default function Dashboard() {
  const sidebarItems = [
    { label: "Accueil", path: "accueil", icon: <FaHome style={{ marginRight: "8px" }} /> },
    { label: "Projets", path: "projets" , icon: <GrProjects style={{ marginRight: "8px" }}/>},
    { label: "Tâches", path: "taches" , icon:<FaTasks style={{ marginRight: "8px" }}/> },
    { label: "Équipe", path: "equipe" ,icon:<AiOutlineTeam style={{ marginRight: "8px" }}/>},
    { label: "Utilisateurs", path: "utilisateurs" ,icon: <FaRegUserCircle style={{ marginRight: "8px" }}/>},
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo"><DiScrum style={{fontSize:"80px" , marginLeft: "60px" }}/>SprintCraft</h1>
        <nav>
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
              end
            >
              {item.icon} {/* This will only render for items with an icon */}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

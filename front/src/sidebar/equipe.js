import React, { useState } from "react";
import "./Equipe.css";
import { AiOutlineTeam } from "react-icons/ai";

export default function Equipe() {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTeamId, setEditingTeamId] = useState(null); // ID en mode modification

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Équipe Frontend",
      description: "Développement de l’interface utilisateur et intégration.",
      color: "#415683ff",
      createdAt: "15/01/2024",
    },
    {
      id: 2,
      name: "Équipe Backend",
      description: "Gestion de la logique métier et de la base de données.",
      color: "#186835ff",
      createdAt: "20/02/2024",
    },
  ]);

  const colors = [
    { id: 1, hex: "#415683ff" },
    { id: 2, hex: "#186835ff" },
    { id: 3, hex: "#d69406ff" },
    { id: 4, hex: "#9b0d0dff" },
    { id: 5, hex: "#8e2ee7ff" },
    { id: 6, hex: "#097c91ff" },
  ];

  // Ajouter ou Modifier une équipe
  const handleSaveTeam = () => {
    if (!teamName.trim()) {
      alert("Veuillez entrer un nom d'équipe");
      return;
    }

    if (editingTeamId) {
      // Modification
      setTeams(
        teams.map((team) =>
          team.id === editingTeamId
            ? { ...team, name: teamName, description, color: selectedColor || team.color }
            : team
        )
      );
    } else {
      // Création
      const newTeam = {
        id: Date.now(),
        name: teamName,
        description,
        color: selectedColor || "#2563eb",
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };
      setTeams([...teams, newTeam]);
    }

    // Réinitialisation
    setTeamName("");
    setDescription("");
    setSelectedColor(null);
    setEditingTeamId(null);
    setShowModal(false);
  };

  // Supprimer avec confirmation
  const handleDeleteTeam = (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette équipe ?");
    if (confirmDelete) {
      setTeams(teams.filter((team) => team.id !== id));
    }
  };

  // Ouvrir modal en mode modification
  const handleEditTeam = (team) => {
    setEditingTeamId(team.id);
    setTeamName(team.name);
    setDescription(team.description);
    setSelectedColor(team.color);
    setShowModal(true);
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>
          <AiOutlineTeam style={{ marginRight: "8px" }} /> Gestion d'équipes
        </h1>
        <button className="btn-create" onClick={() => setShowModal(true)}>
          ➕ Créer une équipe
        </button>
      </div>

      <p>Gérez les membres de votre équipe.</p>

      {/* Liste des équipes */}
      <div className="teams-list">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            style={{ borderLeft: `6px solid ${team.color}` }}
          >
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <small>Date de création : {team.createdAt}</small>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleEditTeam(team)}>
                ✏ Modifier
              </button>
              <button className="btn-delete" onClick={() => handleDeleteTeam(team.id)}>
                🗑 Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingTeamId ? "Modifier l'équipe" : "Créer une nouvelle équipe"}</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditingTeamId(null);
                  setTeamName("");
                  setDescription("");
                  setSelectedColor(null);
                }}
              >
                &times;
              </button>
            </div>

            <div className="form-group">
              <label>Nom de l'équipe</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: Équipe Frontend"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'équipe et de ses responsabilités"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Couleur de l'équipe</label>
              <div className="color-picker">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`color-circle ${selectedColor === color.hex ? "selected" : ""}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowModal(false);
                  setEditingTeamId(null);
                  setTeamName("");
                  setDescription("");
                  setSelectedColor(null);
                }}
              >
                Annuler
              </button>
              <button className="btn-submit" onClick={handleSaveTeam}>
                {editingTeamId ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

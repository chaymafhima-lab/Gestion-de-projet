import React, { useEffect, useState } from "react";
import { FaUsers, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import "./Projets.css";

export default function Projets() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    titre: "",
    description: "",
    status: "Actif",
    membre: 0,
    date: "",
  });
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const apiUrl = "http://localhost:5029/api/Projet";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error("Erreur en récupérant les projets :", err);
      setError("Erreur lors du chargement des projets.");
    } finally {
      setLoading(false);
    }
  };

  const openForm = (project = null) => {
    if (project) {
      setFormData({
        id: project.id,
        titre: project.titre,
        description: project.description,
        status: project.status,
        membre: project.membre,
        date: project.date.split('T')[0], 
      });
    } else {
      setFormData({
        id: null,
        titre: "",
        description: "",
        status: "Actif",
        membre: 0,
        date: new Date().toISOString().split('T')[0], 
      });
    }
    setFormVisible(true);
    setSubmitError(null); 
  };

  const closeForm = () => {
    setFormVisible(false);
    setSubmitError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      let res;
      const payload = {
        id: formData.id,
        titre: formData.titre,
        description: formData.description,
        status: formData.status,
        membre: Number(formData.membre),
        date: formData.date, 
      };

      if (formData.id) {
        // Modification (PUT)
        res = await fetch(`${apiUrl}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Création (POST)
        res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      // Check if the request was successful
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${res.status}`);
      }

      await fetchProjects();
      setFormVisible(false);
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire :", err);
      setSubmitError(err.message || "Une erreur est survenue lors de l'envoi du formulaire.");
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const res = await fetch(`${apiUrl}/${project.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Erreur DELETE ${res.status}`);
      await fetchProjects();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Erreur lors de la suppression du projet.");
    }
  };

  return (
    <div className="projets-container">
      <div className="header">
        <h1>
          <GrProjects style={{ marginRight: "8px" }} />
          Gestion des projets
        </h1>
        <button className="btn-new-project" onClick={() => openForm()}>
          + Nouveau projet
        </button>
      </div>

      {loading ? (
        <p>Chargement des projets...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h2>{project.titre}</h2>
              <p>{project.description}</p>
              <span className={`status ${project.status}`}>
                {project.status}
              </span>
              <div className="project-info">
                <div>
                  <FaUsers /> {project.membre} membres
                </div>
                <div>
                  <FaCalendarAlt /> {new Date(project.date).toLocaleDateString()}
                </div>
              </div>

              <div className="project-actions">
                <button className="btn-edit" onClick={() => openForm(project)}>
                  <FaEdit /> Modifier
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(project)}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{formData.id ? "Modifier le projet" : "Ajouter un projet"}</h2>
            
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="titre"
                placeholder="Titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Actif">Actif</option>
                <option value="En attente">En attente</option>
                <option value="Terminé">Terminé</option>
              </select>
              <input
                type="number"
                name="membre"
                placeholder="Nombre de membres"
                value={formData.membre}
                onChange={handleChange}
                min="0"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  {formData.id ? "Enregistrer" : "Ajouter"}
                </button>
                <button type="button" className="btn-cancel" onClick={closeForm}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
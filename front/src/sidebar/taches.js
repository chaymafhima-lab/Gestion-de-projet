import React, { useState } from "react";
import "./Taches.css";
import { FaTasks ,FaEdit,FaTrash } from "react-icons/fa";

export default function Taches() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Préparer le rapport", assignedTo: "Chayma", dueDate: "2025-08-20", status: "En cours" },
    { id: 2, title: "Réunion avec l'équipe", assignedTo: "Lyna", dueDate: "2025-08-17", status: "Terminée" },
    { id: 3, title: "Mise à jour du site", assignedTo: "Emna", dueDate: "2025-08-25", status: "En attente" },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    status: "En attente",
  });

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.assignedTo.trim() || !newTask.dueDate) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    resetForm();
  };

  const handleEditTask = () => {
    setTasks(tasks.map(t => (t.id === editingTask ? { id: editingTask, ...newTask } : t)));
    resetForm();
  };

  const resetForm = () => {
    setNewTask({ title: "", assignedTo: "", dueDate: "", status: "En attente" });
    setEditingTask(null);
    setShowModal(false);
  };
  const handleDelete = (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
    setTasks(tasks.filter(t => t.id !== id));
  }
};



  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="header">
        <h1><FaTasks style={{ marginRight: "8px" }} />Gestion des Tâches</h1>
        <button className="btn-add-task" onClick={() => setShowModal(true)}>
          + Nouvelle tâche
        </button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Rechercher une tâche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Assignée à</th>
              <th>Date limite</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>
                  <span
                    className={`status-badge ${
                      task.status === "Terminée"
                        ? "status-done"
                        : task.status === "En cours"
                        ? "status-progress"
                        : "status-pending"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => {
                    setEditingTask(task.id);
                    setNewTask({
                    title: task.title,
                    assignedTo: task.assignedTo,
                    dueDate: task.dueDate,
                    status: task.status,
                    });
                   setShowModal(true);
                  }}>
                  <FaEdit />Modifier
                </button>

                <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                 <FaTrash />Supprimer
                </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* En-tête du modal */}
            <div className="modal-header">
              <h2>{editingTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</h2>
              <button className="close-btn" onClick={resetForm}>
                &times;
              </button>
            </div>

            {/* Champs du formulaire */}
            <input
              type="text"
              placeholder="Titre"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Assignée à"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option>En attente</option>
              <option>En cours</option>
              <option>Terminée</option>
            </select>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={resetForm}>
                Annuler
              </button>
              {editingTask ? (
                <button className="btn-submit" onClick={handleEditTask}>
                  Enregistrer
                </button>
              ) : (
                <button className="btn-submit" onClick={handleAddTask}>
                  Ajouter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

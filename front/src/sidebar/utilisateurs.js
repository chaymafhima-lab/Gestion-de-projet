import React, { useState } from "react";
import "./Utilisateurs.css";
import { FaRegUserCircle,FaTrash,FaEdit } from "react-icons/fa";

export default function Utilisateurs() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [users, setUsers] = useState([
    { id: 1, nom: "Fhima", prenom: "Chayma", email: "chayma22@gmail.com", dateCreation: "2024-01-15", role: "Scrum Master" },
    { id: 2, nom: "Guezguez", prenom: "Lyna", email: "Lyna_321@gmail.com", dateCreation: "2024-02-10", role: "ProductOwner" },
  ]);

  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "",
  });

  const filteredUsers = users.filter(
    (u) =>
      u.nom.toLowerCase().includes(search.toLowerCase()) ||
      u.prenom.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.nom || !newUser.prenom || !newUser.email || !newUser.password || !newUser.role) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    setUsers([...users, { id: Date.now(), ...newUser, dateCreation: today }]);
    resetForm();
  };

  const handleEditUser = () => {
    setUsers(users.map(u => (u.id === editingUser ? { id: editingUser, ...newUser, dateCreation: users.find(us => us.id === editingUser).dateCreation } : u)));
    resetForm();
  };


  const resetForm = () => {
    setNewUser({ nom: "", prenom: "", email: "", password: "", role: "" });
    setEditingUser(null);
    setShowModal(false);
  };
  const handleDelete = (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    setUsers(users.filter(u => u.id !== id));
  }
};


  return (
    <div className="users-container">
      {/* Header */}
      <div className="header">
        <h1><FaRegUserCircle style={{ marginRight: "8px" }} />Gestion des Utilisateurs</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Nouvel utilisateur</button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Date de création</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.prenom}</td>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.dateCreation}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setEditingUser(user.id);
                      setNewUser({ nom: user.nom, prenom: user.prenom, email: user.email, password: "", role: user.role });
                      setShowModal(true);
                    }}
                  >
                  <FaEdit />Modifier
                  </button>
                <button className="btn-delete" onClick={() => handleDelete(user.id)}>
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
            <div className="modal-header">
              <h2>{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h2>
              <button className="close-btn" onClick={resetForm}>&times;</button>
            </div>

            <input type="text" placeholder="Prénom" value={newUser.prenom} onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })} />
            <input type="text" placeholder="Nom" value={newUser.nom} onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })} />
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="">-- Choisir un rôle --</option>
              <option>Scrum Master</option>
              <option>Product Owner</option>
              <option>Developer</option>
            </select>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={resetForm}>Annuler</button>
              {editingUser ? (
                <button className="btn-submit" onClick={handleEditUser}>Enregistrer</button>
              ) : (
                <button className="btn-submit" onClick={handleAddUser}>Ajouter</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import api from "../../utils/api";
import styles from "./admin.module.css"; // Assurez-vous d'importer le fichier CSS

const AddUser = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    registerNumber: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users", formData);
      onUserAdded(); // Rafraîchir la liste
      onClose();     // Fermer la modal
    } catch (err) {
      console.error("Erreur création :", err);
      alert("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Ajouter un utilisateur</h3>
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Mot de passe :</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Rôle :</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === "manager" && (
            <>
              <label>Numéro de Registre du Tourisme :</label>
              <input type="text" name="registerNumber" value={formData.registerNumber} onChange={handleChange} required />
            </>
          )}

          <div style={{ marginTop: "10px" }}>
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

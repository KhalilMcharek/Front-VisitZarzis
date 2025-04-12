import React from "react";
import api from "../../utils/api";

const EditUserForm = ({ user, setEditingUser, onUpdate }) => {
  const [formData, setFormData] = React.useState({ ...user });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${user._id}`, formData);
      onUpdate(formData); // update in parent state
      setEditingUser(null);
    } catch (err) {
      console.error("Erreur modification :", err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
      <h3>Modifier l’utilisateur</h3>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Rôle :</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="client">Client</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <br />
        <button type="submit" style={{ marginTop: "10px" }}>Enregistrer</button>
        <button
          type="button"
          onClick={() => setEditingUser(null)}
          style={{ marginLeft: "10px" }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;

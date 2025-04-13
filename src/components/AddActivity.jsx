// src/components/AddActivity.jsx
import { useState } from "react";
import api from "../utils/api";
import styles from "../styles/modal.module.css";

const AddActivity = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    mainImage: null,
    gallery: [],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage") {
      setFormData((prev) => ({ ...prev, mainImage: files[0] }));
    } else if (name === "gallery") {
      setFormData((prev) => ({ ...prev, gallery: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === "gallery") {
        for (let file of formData.gallery) {
          data.append("gallery", file);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await api.post("/api/activities", data);
      setMessage("Activité créée avec succès.");
      onCreated(); // pour rafraîchir la liste
      setTimeout(onClose, 1000); // fermer après 1 sec
    } catch (err) {
      console.error("Erreur création :", err);
      alert("Erreur lors de la création de l’activité.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Nouvelle activité</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Titre" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="location" placeholder="Lieu" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Prix" onChange={handleChange} required />
          <label>Image principale</label>
          <input name="mainImage" type="file" accept="image/*" onChange={handleChange} required />
          <label>Galerie (optionnel)</label>
          <input name="gallery" type="file" accept="image/*" multiple onChange={handleChange} />

          <button type="submit">Ajouter</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </form>
        {message && <p className={styles.success}>{message}</p>}
      </div>
    </div>
  );
};

export default AddActivity;

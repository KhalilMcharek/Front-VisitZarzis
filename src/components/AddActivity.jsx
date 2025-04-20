import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../redux/slices/activitiesSlice";
import ActivityForm from "./ActivityForm"; 
import styles from "../styles/modal.module.css";


const AddActivity = ({ onClose, onCreated }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.activities);

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
      await dispatch(createActivity(data)).unwrap();
      setMessage("Activité créée avec succès.");
      onCreated();
      setTimeout(onClose, 1000);
    } catch (err) {
      console.error("Erreur création :", err);
      alert(err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <h3 style={{ marginTop: "30px", marginBottom: "20px" }}>Nouvelle activité</h3>        
      <ActivityForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          mode="add"
          onCancel={onClose}
        />
        {message && <p className={styles.success}>{message}</p>}
      </div>
    </div>
  );
};

export default AddActivity;

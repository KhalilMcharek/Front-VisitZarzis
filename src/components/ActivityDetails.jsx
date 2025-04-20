import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateActivity } from "../redux/slices/activitiesSlice";
import api from "../utils/api";
import styles from "../styles/ActivityDetails.module.css";
import styled from "../styles/modal.module.css";
import ActivityForm from "./ActivityForm";

const ActivityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activity, setActivity] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get(`/api/activities/${id}`);
        setActivity(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          price: res.data.price,
          mainImage: null,
          gallery: [],
        });
      } catch (err) {
        setError("Impossible de charger l’activité.");
        console.error(err);
      }
    };

    fetchActivity();
  }, [id]);

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
      await dispatch(updateActivity({ id, formData: data })).unwrap();
      setIsEditing(false);
      // Optionally, reload updated activity
      const res = await api.get(`/api/activities/${id}`);
      setActivity(res.data);
    } catch (err) {
      alert("Erreur lors de la mise à jour");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!activity || !formData) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      {!isEditing ? (
        <>
          <h2 className={styles.title}>{activity.title}</h2>
          <img
            src={activity.mainImage}
            alt={activity.title}
            className={styles.mainImage}
          />

          <div className={styles.details}>
            <p><strong>Description :</strong> {activity.description}</p>
            <p><strong>Lieu :</strong> {activity.location}</p>
            <p><strong>Prix :</strong> {activity.price} TND</p>
            <p><strong>Organisé par :</strong> {activity.manager?.name}</p>
          </div>

          {activity.gallery?.length > 0 && (
            <div className={styles.gallerySection}>
              <h4>Galerie</h4>
              <div className={styles.galleryGrid}>
                {activity.gallery.map((img, index) => (
                  <img key={index} src={img} alt={`Gallery ${index}`} />
                ))}
              </div>
            </div>
          )}

          {(user?.role === "admin" || user?.id === activity.manager?._id) && (
            <div className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Modifier cette activité
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styled.overlay}>
              <div className={styled.modal}>
              <h3 style={{ marginTop: "30px", marginBottom: "20px" }}>modifier activité</h3> 
        <ActivityForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={false}
          mode="edit"
          onCancel={() => setIsEditing(false)}
        />
              </div>
            </div>
      )}
    </div>
  );
};

export default ActivityDetails;

import { useEffect, useState } from "react";
import api from "../utils/api";
import ActivityCard from "./ActivityCard";
import styles from "../styles/activitiesDash.module.css"; // à créer
import AddActivity from "./AddActivity";

const ActivitiesDash = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get("/api/activities");
        setActivities(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des activités.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Supprimer cette activité ?");
    if (!confirm) return;

    try {
      await api.delete(`/api/activities/${id}`);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  const handleEdit = (activity) => {
    // À implémenter : ouvrir un modal ou formulaire d'édition
    console.log("Éditer activité :", activity);
  };

  return (
    <div>
    {/* En-tête avec titre + bouton aligné à droite */}
    <div className={styles.header}>
      <h2 className={styles.title}>Mes Activités</h2>
      <button onClick={() => setShowAddModal(true)} className={styles.addBtn}>
        ➕ Ajouter une activité
      </button>
    </div>

    {loading && <p>Chargement...</p>}
    {error && <p className="error-message">{error}</p>}

    {showAddModal && (
      <AddActivity
        onClose={() => setShowAddModal(false)}
        onCreated={() => {
          api.get("/api/activities").then((res) => setActivities(res.data));
        }}
      />
    )}

    <div className={styles.grid}>
      {activities.map((activity) => (
        <div key={activity._id} className={styles.cardWrapper}>
          <ActivityCard activity={activity} />

          {(user.role === "admin" || user.id === activity.manager?._id) && (
            <div className={styles.actions}>
              <button
                onClick={() => handleEdit(activity)}
                className={styles.editBtn}
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(activity._id)}
                className={styles.deleteBtn}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
};

export default ActivitiesDash;

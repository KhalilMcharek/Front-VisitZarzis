import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../redux/slices/activitiesSlice";
import api from "../utils/api";
import ActivityCard from "./ActivityCard";
import styles from "../styles/activitiesDash.module.css";
import AddActivity from "./AddActivity";

const ActivitiesList = () => {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector((state) => state.activities);
  const [showAddModal, setShowAddModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Supprimer cette activité ?");
    if (!confirm) return;

    try {
      await api.delete(`/api/activities/${id}`);
      dispatch(fetchActivities()); 
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  //const handleEdit = (activity) => {
    //console.log("Éditer activité :", activity);
  //};

  return (
    <div>
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
          onCreated={() => dispatch(fetchActivities())}
        />
      )}

      <div className={styles.grid}>
        {activities.map((activity) => (
          <div key={activity._id} className={styles.cardWrapper}>
            <ActivityCard activity={activity} />
            {(user.role === "admin" || user.id === activity.manager?._id) && (
              <div className={styles.actions}>
                 {/*
                <button
                  onClick={() => handleEdit(activity)}
                  className={styles.editBtn}
                >
                  Modifier
                </button>
                */}
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

export default ActivitiesList;

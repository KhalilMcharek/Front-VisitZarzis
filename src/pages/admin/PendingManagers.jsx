import { useEffect, useState } from "react";
import api from "../../utils/api"; // ton fichier axios déjà configuré

const PendingManagers = () => {
  const [pendingManagers, setPendingManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingManagers = async () => {
      try {
        const res = await api.get("/api/admin/managers/pending");
        setPendingManagers(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des managers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingManagers();
  }, []);
  const handleValidate = async (id) => {
    try {
      await api.patch(`/api/admin/managers/validate/${id}`);
      // Mettre à jour l'état local (on enlève ce manager de la liste)
      setPendingManagers(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error("Erreur lors de la validation :", err);
      alert("Une erreur est survenue lors de la validation.");
    }
  };
  return (
    <div>
      <h2>Managers en attente de validation</h2>

      {loading && <p>Chargement...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && pendingManagers.length === 0 && (
        <p>Aucun manager en attente.</p>
      )}

      <ul>
        {pendingManagers.map((manager) => (
          <li key={manager._id}>
            <strong>{manager.name}</strong> - {manager.email} - Registre: {manager.registerNumber}
            <button style={{ marginLeft: "10px" }} onClick={() => handleValidate(manager._id)}>
              Valider 
              
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingManagers;

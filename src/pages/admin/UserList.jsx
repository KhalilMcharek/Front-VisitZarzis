import { useEffect, useState } from "react";
import api from "../../utils/api";
import EditUserForm from "./EditUserForm";
import AddUser from "./AddUser";
import styles from "./admin.module.css"; // Assurez-vous d'importer le fichier CSS



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Es-tu sûr de vouloir supprimer cet utilisateur ?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  // 🔍 Filtrage par recherche (nom ou email)
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className={styles.pageTitle}>Liste des utilisateurs</h2>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher par nom ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* Bouton ajouter */}
      <button onClick={() => setShowAddUserModal(true)} className={styles.addBtn}>
        ➕ Ajouter un utilisateur
      </button>

      {/* Affichage conditionnel */}
      {loading && <p>Chargement...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && filteredUsers.length === 0 && (
        <p>Aucun utilisateur ne correspond à la recherche.</p>
      )}

      {/* Tableau des utilisateurs */}
      {!loading && filteredUsers.length > 0 && (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionButtons}>
                  {loggedInUser?.id !== u._id ? (
                    <>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className={styles.deleteBtn}
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => setEditingUser(u)}
                        className={styles.editBtn}
                      >
                        Modifier
                      </button>
                    </>
                  ) : (
                    <em style={{ color: "gray" }}>Vous-même</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Formulaire modification */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          setEditingUser={setEditingUser}
          onUpdate={(updatedUser) => {
            setUsers((prev) =>
              prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
            );
          }}
        />
      )}

      {/* Modal ajout */}
      {showAddUserModal && (
        <AddUser
          onClose={() => setShowAddUserModal(false)}
          onUserAdded={() => {
            api.get("/api/users").then((res) => setUsers(res.data));
          }}
        />
      )}
    </div>
  );
};

export default UserList;

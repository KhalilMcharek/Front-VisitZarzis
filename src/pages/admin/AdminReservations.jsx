import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReservations,updateReservationStatus } from "../../redux/slices/reservationsSlice";
import ReservationsTable from "../../components/ReservationsTable";
import api from "../../utils/api";

const AdminReservations = () => {
  const dispatch = useDispatch();
  const { list: reservations, loading, error } = useSelector((state) => state.reservations);
  const handleStatusChange = (id, status) => {
    dispatch(updateReservationStatus({ id, status }));
  };
  
  useEffect(() => {
    dispatch(fetchAllReservations("admin"));
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Supprimer cette reservation ?");
    if (!confirm) return;

    try {
      await api.delete(`/api/bookings/${id}`);
      dispatch(fetchAllReservations()); 
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Réservations - Admin</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ReservationsTable
        reservations={reservations}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminReservations;

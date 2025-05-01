import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerReservations } from "../../redux/slices/reservationsSlice";
import ReservationsTable from "../../components/ReservationsTable";
import api from "../../utils/api";
const ManagerReservations = () => {
  const dispatch = useDispatch();
  const handleStatusChange = (id, status) => {
    dispatch(updateReservationStatus({ id, status }));
  };
  
  const { list: reservations, loading, error } = useSelector(
    (state) => state.reservations
  );
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

  useEffect(() => {
    dispatch(fetchManagerReservations("manager"));
  }, [dispatch]);

  return (
    <div >
      <h2>Mes Réservations</h2>

      {loading && <p>Chargement...</p>}
      {error && <p className="error-message">{error}</p>}

      {
        <ReservationsTable reservations={reservations}
        onDelete = {handleDelete}
        onStatusChange={handleStatusChange} />
      }
    </div>
  );
};

export default ManagerReservations;

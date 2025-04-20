import React from "react";

const ReservationsTable = ({ reservations = [],onStatusChange, onDelete }) => {
  if (reservations.length === 0) {
    return <p>Aucune réservation</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Email</th>
          <th>Activité</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((res) => (
          <tr key={res._id}>
            <td>{res.client?.name || "—"}</td>
            <td>{res.client?.email || "—"}</td>
            <td>{res.activity?.title || "—"}</td>
            <td>{new Date(res.bookingDate).toLocaleDateString()}</td>          
              <td>{res.status}</td>
            <td>
              {onStatusChange && (
                <>
                  <button onClick={() => onStatusChange(res._id, "confirmed")}>
                    ✅
                  </button>
                  <button onClick={() => onStatusChange(res._id, "cancelled")}>
                    ❌
                  </button>
                </>
              )}
              {onDelete && (
                <button onClick={() => onDelete(res._id)} style={{ color: "red" }}>
                  🗑️
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;

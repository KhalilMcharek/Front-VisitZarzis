import { Outlet, NavLink } from "react-router-dom";
import "../../styles/app.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <NavLink to="/admin" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/managers">Pending Managers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">User List</NavLink>
          </li>

          <li>
            <NavLink to="/admin/activities">activities</NavLink>
          </li>
          <li>
            <NavLink to="/admin/reservations">Réservations</NavLink>
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

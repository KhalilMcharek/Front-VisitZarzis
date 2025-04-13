import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../../styles/app.css";

const ManagerLayout = () => {
  return (
    <div className="admin-layout">
      <aside  className="admin-sidebar">
        <h2>Manager Panel</h2>
        <ul>
          <li>
            <NavLink to="/manager/activities">activities</NavLink>
          </li>
        </ul>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>{" "}
    </div>
  );
};

export default ManagerLayout;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "../src/styles/app.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import HomePage from "./pages/HomePage";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import Navbar from "./components/Navbar";
import AdminLayout from "./pages/admin/AdminLayout";
import PendingManagers from "./pages/admin/PendingManagers";
import UserList from "./pages/admin/UserList";
import ActivitiesList from "./components/ActivitiesList";
import ManagerLayout from "./pages/manager/ManagerLayout";
import ActivityDetails from "./components/ActivityDetails";
import ManagerReservations from "./pages/manager/ManagerReservations";
import AdminReservations from "./pages/admin/AdminReservations";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          element={
            <PrivateRoute allowedRoles={["admin", "manager", "client"]} />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
        </Route>

        {/* Admin protected routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="managers" element={<PendingManagers />} />
            <Route path="users" element={<UserList />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="activities">
              <Route index element={<ActivitiesList showControls={true} />} />
              <Route path=":id" element={<ActivityDetails />} />
            </Route>
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="reservations" element={<ManagerReservations />} />
            <Route
              path="activities"
              element={<ActivitiesList showControls={true} />}
            />
            <Route
              path="activities/:id"
              element={<h2>Détails d’activité</h2>}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

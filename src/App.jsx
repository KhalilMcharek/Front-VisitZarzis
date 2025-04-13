import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "../src/styles/app.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import HomePage from "./pages/home/HomePage";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import Navbar from "./components/Navbar";
import AdminLayout from "./pages/admin/AdminLayout";
import PendingManagers from "./pages/admin/PendingManagers";
import UserList from "./pages/admin/UserList";
import ActivitiesDash from "./components/ActivitiesDash";
import ManagerLayout from "./pages/manager/ManagerLayout";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin protected routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="managers" element={<PendingManagers />} />
            <Route path="users" element={<UserList />} />
            <Route path="activities">
              <Route index element={<ActivitiesDash />} />
              <Route path=":id" element={<h2>Activity Details</h2>} />
            </Route>
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="activities" element={<ActivitiesDash />} />
            <Route path="activities/:id" element={<h2>Détail d’activité</h2>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

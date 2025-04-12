import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const activeClass = ({ isActive }) => (isActive ? "active-link" : "");

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
      Visit Zarzis
      </NavLink>

      <ul className="navbar-links">
        {!user && (
          <>
            <li>
              <NavLink to="/login" className={activeClass}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className={activeClass}>Register</NavLink>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li>
              <NavLink to="/admin" className={activeClass}>Dashboard</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

        {user?.role === "manager" && (
          <>
            <li>
              <NavLink to="/manager" className={activeClass}>Dashboard</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

        {user?.role === "client" && (
          <>
            <li>
              <NavLink to="/home" className={activeClass}>Activities</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

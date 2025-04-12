import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice"; // Redux action
import { Link } from "react-router-dom";
import '../../styles/auth.css';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Redux state

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    registerNumber: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)); // Dispatch Redux action
  };

  return (
    <div className="auth-body">
      <div className="register-container">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label className="form-label">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="client">User</option>
            <option value="manager">Manager</option>
          </select>

          {formData.role === "manager" && (
            <div className="manager-register-number">
              <label className="form-label">Numéro de Registre du Tourisme</label>
              <input
                type="text"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <label className="form-label">Email address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="form-label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <div className="terms-checkbox">
            <input type="checkbox" name="checkbox" required />
            <span>
              I agree to all statements in{" "}
              <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                terms of service
              </a>.
            </span>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="register-footer">
          <p>
            <Link to="/">Back to Homepage</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/slices/authSlice"; 
import "../../styles/auth.css";
export default function Login() {

    const dispatch = useDispatch();
    const { loading, error , user } = useSelector((state) => state.auth); // Redux state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(loginUser({ email, password })); // Dispatch Redux action  
    };
    useEffect(() => {
        if (user) {
          if (user.role === "admin") {
            navigate("/admin");
          } else if (user.role === "manager") {
            navigate("/manager");
          } else {
            navigate("/");
          }
        }
      }, [user, navigate]);
    return (
        <div className="auth-body">
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {error && <p className="error-message">{error}</p>}

                    <div className="forget-password">
                        <Link to="/forget-password">Forget password?</Link>
                    </div>

                    <button type="submit" className="login-button"disabled={loading}>
                    {loading ? "Logging in..." : "Login"} {/* Disable button if loading */} 
                       
                    </button>
                </form>

                <div className="login-footer">
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </div>
            </div>
        </div>
    );
}

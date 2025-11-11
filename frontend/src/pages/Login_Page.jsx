import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  clearError,
} from "../store/slices/auth.slice.js";
import "../styles/Login_Page.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "learner",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "tutor" ? "/tutor" : "/learner");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    } else {
      dispatch(registerUser(formData));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h1 className="login-title">MathLearn</h1>
          <p className="login-subtitle">Grade 12 Mathematics Platform</p>
        </div>

        {/* Login/Register Form */}
        <div className="login-card">
          <div className="login-tabs">
            <button
              onClick={() => setIsLogin(true)}
              className={`login-tab ${isLogin ? "active" : ""}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`login-tab ${!isLogin ? "active" : ""}`}
            >
              Register
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="label">I am a</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="learner">Learner</option>
                  <option value="tutor">Tutor</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-large"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-title">Demo credentials:</p>
            <p className="login-footer-text">
              Learner: learner@example.com / password123
              <br />
              Tutor: tutor@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

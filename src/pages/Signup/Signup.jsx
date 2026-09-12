import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../Login/Login.css";

const Signup = ({ onLogin }) => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signup(name, email, password);

      // No navigation needed.
      // AuthContext sets the user,
      // which automatically shows the dashboard.
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create account 🚀</h1>
          <p>Start managing your tasks with TaskFlow</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Sign up"}
          </button>
        </form>

        <div className="auth-switch">
          <span>Already have an account?</span>

          <button onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

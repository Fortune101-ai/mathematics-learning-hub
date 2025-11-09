import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Login_Page.jsx";
import LearnerDashboard from "./pages/Learner_Dashboard.jsx";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/learner/*"
        element={
          isAuthenticated && user?.role === "learner" ? (
            <LearnerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;

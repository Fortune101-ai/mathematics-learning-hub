import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Login_Page.jsx";
import LearnerDashboard from "./pages/Learner_Dashboard.jsx";
import TutorDashboard from "./pages/Tutor_Dashboard.jsx";
import LandingPage from "./pages/Landing_Page.jsx";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <LandingPage />
          ) : isAuthenticated && user?.role === "tutor" ? (
            <Navigate to="/tutor" replace />
          ) : (
            <Navigate to="/learner" replace />
          )
        }
      />


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

      <Route
        path="/tutor/*"
        element={isAuthenticated && user?.role === "tutor" ? <TutorDashboard /> : <Navigate to="/login" replace />}
      />

      
    </Routes>
  );
}

export default App;

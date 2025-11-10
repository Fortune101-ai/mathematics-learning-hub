import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginPage from "./pages/Login_Page"
import LearnerDashboard from "./pages/Learner_Dashboard"
import TutorDashboard from "./pages/Tutor_Dashboard"
import LandingPage from "./pages/Landing_Page"
import TopicPage from "./pages/Topic_Page"
import BookingPage from "./pages/Booking_Page"
import ForumPage from "./pages/Forum_Page"
import ProgressPage from "./pages/Progress_Page"

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

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
        element={isAuthenticated && user?.role === "learner" ? <LearnerDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/learner/topic/:topicId"
        element={isAuthenticated && user?.role === "learner" ? <TopicPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/learner/booking"
        element={isAuthenticated && user?.role === "learner" ? <BookingPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/learner/forum"
        element={isAuthenticated && user?.role === "learner" ? <ForumPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/learner/progress"
        element={isAuthenticated && user?.role === "learner" ? <ProgressPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/tutor/*"
        element={isAuthenticated && user?.role === "tutor" ? <TutorDashboard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App

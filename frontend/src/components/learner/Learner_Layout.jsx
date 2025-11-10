"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/slices/auth.slice.js"
import "../../styles/Learner_Layout.css"

function LearnerLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <div className="learner-layout">
     
      <header className="learner-header">
        <div className="header-container">
          <div className="header-brand">
            <h1 className="app-title">MathLearn</h1>
          </div>

          <nav className="header-nav">
            <button className="nav-link" onClick={() => handleNavigation("/learner")}>
              Topics
            </button>
            <button className="nav-link" onClick={() => handleNavigation("/learner/progress")}>
              Progress
            </button>
            <button className="nav-link" onClick={() => handleNavigation("/learner/booking")}>
              Book Tutor
            </button>
            <button className="nav-link" onClick={() => handleNavigation("/learner/forum")}>
              Forum
            </button>
          </nav>

          <div className="header-user">
            <span className="user-greeting">
              Welcome, <span className="user-name">{user?.name}</span>
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="learner-main">{children}</main>
    </div>
  )
}

export default LearnerLayout

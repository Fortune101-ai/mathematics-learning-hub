import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/slices/auth.slice.js"

function TutorLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <header className="bg-[var(--color-background)] border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--color-primary)]">MathLearn</h1>
              <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full">
                Tutor
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Welcome, <span className="font-medium text-[var(--color-text-primary)]">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}

export default TutorLayout

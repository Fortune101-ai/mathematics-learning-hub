import { useNavigate } from "react-router-dom"
import "../styles/Landing_Page.css"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <header className="landing-header">
        <div className="landing-container flex-between">
          <div className="landing-logo">
            <h1>MathLearn</h1>
          </div>
          <nav className="landing-nav">
            <button className="btn btn-secondary" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-container">
          <div className="hero-content">
            <h2 className="hero-title">Master Mathematics with Expert Guidance</h2>
            <p className="hero-subtitle">
              Connect with qualified tutors, track your progress, and ace your Grade 12 Mathematics exams
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")}>
                Start Learning Now
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate("/login")}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-shape"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-container">
          <h2 className="section-title">Why Choose MathLearn?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive Topics</h3>
              <p>Master all Grade 12 Mathematics topics with structured chapters and clear explanations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Interactive Quizzes</h3>
              <p>Test your knowledge with interactive quizzes and get instant feedback on your answers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Tutors</h3>
              <p>Book sessions with qualified tutors who specialize in Mathematics education</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey with detailed progress reports and analytics</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Community Forum</h3>
              <p>Connect with other learners, ask questions, and share knowledge in our community</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Exam Ready</h3>
              <p>Prepare with exam-style questions and practice tests to boost your confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-how">
        <div className="landing-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account as a learner or tutor in minutes</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Explore Topics</h3>
              <p>Browse and learn from comprehensive Mathematics content</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Practice & Improve</h3>
              <p>Take quizzes and track your progress over time</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Get Support</h3>
              <p>Book tutors or ask the community for help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-container text-center">
          <h2>Ready to Improve Your Mathematics?</h2>
          <p>Join thousands of South African learners already succeeding with MathLearn</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")}>
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container flex-between">
          <p>&copy; 2025 MathLearn. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

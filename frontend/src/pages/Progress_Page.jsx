import LearnerLayout from "../components/learner/Learner_Layout"
import "../styles/Progress_Page.css"

function ProgressPage() {
  const progressData = [
    { topic: "Algebra", progress: 0, chapters: 0, completed: 0 },
    { topic: "Calculus", progress: 0, chapters: 10, completed: 0 },
    { topic: "Geometry", progress: 0, chapters: 0, completed: 0 },
    { topic: "Statistics", progress: 0, chapters: 0, completed: 0 },
    { topic: "Trigonometry", progress: 0, chapters: 0, completed: 0 },
  ]

  const stats = {
    totalHours: 0,
    chaptersCompleted: 0,
    quizzesCompleted: 0,
    currentStreak:0,
  }

  return (
    <LearnerLayout>
      <div className="progress-page">
        <div className="progress-header">
          <h1 className="progress-title">Your Learning Progress</h1>
          <p className="progress-subtitle">Track your academic journey</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalHours}</div>
            <div className="stat-label">Hours Studied</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.chaptersCompleted}</div>
            <div className="stat-label">Chapters Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.quizzesCompleted}</div>
            <div className="stat-label">Quizzes Taken</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        <div className="progress-section">
          <h2 className="section-title">Topic Progress</h2>
          <div className="progress-list">
            {progressData.map((item, idx) => (
              <div key={idx} className="progress-item">
                <div className="progress-info">
                  <h3 className="progress-topic">{item.topic}</h3>
                  <span className="progress-detail">
                    {item.completed} of {item.chapters} chapters
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="progress-percent">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LearnerLayout>
  )
}

export default ProgressPage

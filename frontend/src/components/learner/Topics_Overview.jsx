"use client"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../../styles/Topic_Overview.css"

function TopicsOverview() {
  const { topics } = useSelector((state) => state.topics)
  const navigate = useNavigate()

  const handleTopicClick = (topicId) => {
    navigate(`/learner/topic/${topicId}`)
  }

  return (
    <div className="topics-container">
      <div className="topics-header">
        <h2 className="topics-title">Your Learning Journey</h2>
        <p className="topics-subtitle">Master Grade 12 Mathematics one topic at a time</p>
      </div>

      <div className="topics-grid">
        {topics &&
          topics.map((topic) => (
            <div key={topic.id} className="topic-card" onClick={() => handleTopicClick(topic.id)}>
              <h3 className="topic-card-title">{topic.title}</h3>
              <p className="topic-card-description">{topic.description}</p>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percent">{topic.progress || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${topic.progress || 0}%` }} />
                </div>
              </div>

              <div className="topic-footer">
                <span className="chapters-count">{topic.chapters?.length || 0} chapters</span>
                <span className="cta-link">Start Learning →</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TopicsOverview

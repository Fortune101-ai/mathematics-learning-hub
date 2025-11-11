import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LearnerLayout from "../components/learner/Learner_Layout"
import "../styles/Topic_Page.css"

function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const { topics } = useSelector((state) => state.topics)
  const [selectedChapterId, setSelectedChapterId] = useState(null)

  const topic = topics?.find((t) => t.id === Number.parseInt(topicId))

  if (!topic) {
    return (
      <LearnerLayout>
        <div className="topic-not-found">Topic not found</div>
      </LearnerLayout>
    )
  }

  return (
    <LearnerLayout>
      <div className="topic-page">
        <div className="topic-page-header">
          <button className="back-button" onClick={() => navigate("/learner")}>
            ← Back to Topics
          </button>
          <h1 className="topic-page-title">{topic.title}</h1>
          <p className="topic-page-description">{topic.description}</p>
        </div>

        <div className="chapters-list">
          <h2 className="chapters-title">Chapters</h2>
          {topic.chapters?.map((chapter) => (
            <div key={chapter.id} className="chapter-item" onClick={() => setSelectedChapterId(chapter.id)}>
              <div className="chapter-info">
                <h3 className="chapter-name">{chapter.name}</h3>
                <p className="chapter-desc">{chapter.description}</p>
              </div>
              <span className="chapter-arrow">›</span>
            </div>
          ))}
        </div>

        {selectedChapterId && (
          <div className="chapter-detail-panel">
            <button className="close-panel-btn" onClick={() => setSelectedChapterId(null)}>
              ✕
            </button>
            <ChapterDetail chapterId={selectedChapterId} />
          </div>
        )}
      </div>
    </LearnerLayout>
  )
}

function ChapterDetail({ chapterId }) {
  const { topics } = useSelector((state) => state.topics)
  const [activeTab, setActiveTab] = useState("notes")

  const chapter = topics?.flatMap((t) => t.chapters)?.find((c) => c.id === chapterId)

  if (!chapter) return null

  return (
    <div className="chapter-detail">
      <h2 className="chapter-detail-title">{chapter.name}</h2>

      <div className="chapter-tabs">
        <button className={`tab-button ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>
          Notes
        </button>
        <button
          className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`tab-button ${activeTab === "examples" ? "active" : ""}`}
          onClick={() => setActiveTab("examples")}
        >
          Examples
        </button>
        <button className={`tab-button ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>
          Quiz
        </button>
      </div>

      <div className="chapter-content">
        {activeTab === "notes" && (
          <div className="tab-content">
            <h3>Chapter Notes</h3>
            <div className="notes-placeholder">
              <p>📝 Comprehensive notes for {chapter.name}</p>
              <p>Detailed explanations and key concepts will appear here</p>
              <div className="notes-body">
                • Key concept 1: Definition and application
                <br />• Key concept 2: Problem-solving techniques
                <br />• Key concept 3: Common mistakes to avoid
                <br />
              </div>
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="tab-content">
            <h3>Video Lessons</h3>
            <div className="videos-placeholder">
              <div className="video-item">
                <div className="video-thumbnail">▶ Video 1</div>
                <p>Introduction to {chapter.name}</p>
              </div>
              <div className="video-item">
                <div className="video-thumbnail">▶ Video 2</div>
                <p>Working through example problems</p>
              </div>
              <div className="video-item">
                <div className="video-thumbnail">▶ Video 3</div>
                <p>Advanced topics and applications</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="tab-content">
            <h3>Worked Examples</h3>
            <div className="examples-placeholder">
              <div className="example-item">
                <h4>Example 1</h4>
                <p>Problem: {chapter.name} - Basic application</p>
                <p>Solution: Step-by-step breakdown</p>
              </div>
              <div className="example-item">
                <h4>Example 2</h4>
                <p>Problem: {chapter.name} - Intermediate level</p>
                <p>Solution: Detailed solution with explanations</p>
              </div>
              <div className="example-item">
                <h4>Example 3</h4>
                <p>Problem: {chapter.name} - Advanced application</p>
                <p>Solution: Complete walkthrough</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="tab-content">
            <h3>Chapter Quiz</h3>
            <ChapterQuiz chapterId={chapterId} />
          </div>
        )}
      </div>
    </div>
  )
}

function ChapterQuiz({ chapterId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const quizQuestions = [
    {
      id: 1,
      question: "What is the first concept in this chapter?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 0,
    },
    {
      id: 2,
      question: "How would you apply the main principle?",
      options: ["Method 1", "Method 2", "Method 3", "Method 4"],
      correct: 1,
    },
    {
      id: 3,
      question: "What is the correct answer to this problem?",
      options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correct: 2,
    },
  ]

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    })
  }

  const handleSubmitQuiz = () => {
    let correctCount = 0
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++
      }
    })
    setScore((correctCount / quizQuestions.length) * 100)
  }

  const question = quizQuestions[currentQuestion]

  if (score !== null) {
    return (
      <div className="quiz-result">
        <div className="result-score">
          <div className="score-display">{Math.round(score)}%</div>
          <p>{score >= 70 ? "Great job! 🎉" : "Keep practicing! 💪"}</p>
        </div>
        <button
          className="reset-quiz-btn"
          onClick={() => {
            setScore(null)
            setCurrentQuestion(0)
            setSelectedAnswers({})
          }}
        >
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <span>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="quiz-question">
        <h4>{question.question}</h4>
      </div>

      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`quiz-option ${selectedAnswers[currentQuestion] === idx ? "selected" : ""}`}
            onClick={() => handleAnswerSelect(idx)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="quiz-navigation">
        <button
          className="quiz-btn"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {currentQuestion === quizQuestions.length - 1 ? (
          <button className="quiz-btn submit" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        ) : (
          <button className="quiz-btn" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default TopicPage

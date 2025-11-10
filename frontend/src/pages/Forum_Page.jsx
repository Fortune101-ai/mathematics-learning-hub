"use client"

import { useState } from "react"
import LearnerLayout from "../components/learner/Learner_Layout"
import "../styles/Forum_Page.css"

function ForumPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sibusiso Moyo",
      title: "Help with Integration Problems",
      content: "I'm struggling with integration by parts. Can anyone explain the concept?",
      timestamp: "2 hours ago",
      likes: 5,
      replies: 3,
      liked: false,
    },
    {
      id: 2,
      author: "Lerato Nkosi",
      title: "Derivatives Concept Clarification",
      content: "What's the difference between implicit and explicit differentiation?",
      timestamp: "5 hours ago",
      likes: 12,
      replies: 7,
      liked: false,
    },
  ])

  const [newPost, setNewPost] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)

  const handleCreatePost = () => {
    if (newTitle && newPost) {
      setPosts([
        {
          id: posts.length + 1,
          author: "You",
          title: newTitle,
          content: newPost,
          timestamp: "now",
          likes: 0,
          replies: 0,
          liked: false,
        },
        ...posts,
      ])
      setNewTitle("")
      setNewPost("")
    }
  }

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post,
      ),
    )
  }

  return (
    <LearnerLayout>
      <div className="forum-page">
        <div className="forum-header">
          <h1 className="forum-title">Community Forum</h1>
          <p className="forum-subtitle">Ask questions, share knowledge, and learn together</p>
        </div>

        <div className="forum-container">
          <div className="new-post-section">
            <h2 className="section-title">Start a Discussion</h2>
            <div className="post-form">
              <input
                type="text"
                className="post-title-input"
                placeholder="Question title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="post-content-input"
                placeholder="Describe your question or topic..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows="4"
              />
              <button className="post-btn" onClick={handleCreatePost}>
                Post Question
              </button>
            </div>
          </div>

          <div className="posts-section">
            <h2 className="section-title">Recent Discussions</h2>
            <div className="posts-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-card"
                  onClick={() => setSelectedPost(post.id === selectedPost ? null : post.id)}
                >
                  <div className="post-header">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-author">by {post.author}</span>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-footer">
                    <span className="post-time">{post.timestamp}</span>
                    <div className="post-actions">
                      <button
                        className={`post-like ${post.liked ? "liked" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLikePost(post.id)
                        }}
                      >
                        👍 {post.likes}
                      </button>
                      <span className="post-replies">💬 {post.replies} replies</span>
                    </div>
                  </div>

                  {selectedPost === post.id && (
                    <div className="post-replies-section">
                      <div className="reply-form">
                        <input type="text" className="reply-input" placeholder="Write a reply..." />
                        <button className="reply-btn">Reply</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  )
}

export default ForumPage
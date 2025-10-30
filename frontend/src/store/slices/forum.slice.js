import { createSlice } from "@reduxjs/toolkit"

const mockPosts = [
  {
    id: 1,
    title: "Help with quadratic equations",
    content: "I am struggling to understand how to complete the square. Can someone explain?",
    author: "Anonymous",
    authorId: null,
    topic: "Functions",
    replies: 3,
    views: 45,
    verified: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Derivative of exponential functions",
    content: "What is the derivative of e^(2x)? I keep getting confused with the chain rule.",
    author: "John M.",
    authorId: "learner-123",
    topic: "Calculus",
    replies: 5,
    views: 67,
    verified: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
]

const initialState = {
  posts: mockPosts,
  selectedPost: null,
}

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift({
        id: Date.now(),
        ...action.payload,
        replies: 0,
        views: 0,
        verified: false,
        createdAt: new Date().toISOString(),
      })
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload
    },
    incrementViews: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload)
      if (post) {
        post.views += 1
      }
    },
    verifyPost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload)
      if (post) {
        post.verified = true
      }
    },
  },
})

export const { addPost, setSelectedPost, incrementViews, verifyPost } = forumSlice.actions
export default forumSlice.reducer

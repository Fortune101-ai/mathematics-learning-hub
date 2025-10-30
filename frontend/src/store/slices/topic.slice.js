import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { topicsAPI, progressAPI } from "../../utils/api"

// Mock Grade 12 Mathematics Topics
const mockTopics = [
  {
    id: 1,
    title: "Functions",
    description: "Linear, quadratic, exponential, and logarithmic functions",
    chapters: [
      { id: 1, title: "Linear Functions", unlocked: true, completed: false },
      { id: 2, title: "Quadratic Functions", unlocked: false, completed: false },
      { id: 3, title: "Exponential Functions", unlocked: false, completed: false },
      { id: 4, title: "Logarithmic Functions", unlocked: false, completed: false },
    ],
    progress: 0,
  },
  {
    id: 2,
    title: "Calculus",
    description: "Differentiation and integration",
    chapters: [
      { id: 5, title: "Introduction to Derivatives", unlocked: true, completed: false },
      { id: 6, title: "Rules of Differentiation", unlocked: false, completed: false },
      { id: 7, title: "Applications of Derivatives", unlocked: false, completed: false },
      { id: 8, title: "Introduction to Integration", unlocked: false, completed: false },
    ],
    progress: 0,
  },
  {
    id: 3,
    title: "Trigonometry",
    description: "Trigonometric functions, identities, and equations",
    chapters: [
      { id: 9, title: "Trigonometric Ratios", unlocked: true, completed: false },
      { id: 10, title: "Trigonometric Identities", unlocked: false, completed: false },
      { id: 11, title: "Compound Angles", unlocked: false, completed: false },
      { id: 12, title: "Trigonometric Equations", unlocked: false, completed: false },
    ],
    progress: 0,
  },
  {
    id: 4,
    title: "Analytical Geometry",
    description: "Coordinate geometry and conic sections",
    chapters: [
      { id: 13, title: "Distance and Midpoint", unlocked: true, completed: false },
      { id: 14, title: "Equation of a Line", unlocked: false, completed: false },
      { id: 15, title: "Circle Geometry", unlocked: false, completed: false },
      { id: 16, title: "Parabolas and Hyperbolas", unlocked: false, completed: false },
    ],
    progress: 0,
  },
  {
    id: 5,
    title: "Statistics",
    description: "Data analysis, probability, and distributions",
    chapters: [
      { id: 17, title: "Measures of Central Tendency", unlocked: true, completed: false },
      { id: 18, title: "Probability Basics", unlocked: false, completed: false },
      { id: 19, title: "Normal Distribution", unlocked: false, completed: false },
      { id: 20, title: "Regression Analysis", unlocked: false, completed: false },
    ],
    progress: 0,
  },
  {
    id: 6,
    title: "Sequences and Series",
    description: "Arithmetic and geometric sequences",
    chapters: [
      { id: 21, title: "Arithmetic Sequences", unlocked: true, completed: false },
      { id: 22, title: "Geometric Sequences", unlocked: false, completed: false },
      { id: 23, title: "Series and Summation", unlocked: false, completed: false },
      { id: 24, title: "Financial Mathematics", unlocked: false, completed: false },
    ],
    progress: 0,
  },
]

export const fetchTopics = createAsyncThunk("topics/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await topicsAPI.getAll()
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch topics")
  }
})

export const fetchTopicProgress = createAsyncThunk("topics/fetchProgress", async (_, { rejectWithValue }) => {
  try {
    const response = await progressAPI.getAll()
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch progress")
  }
})

const initialState = {
  topics: mockTopics,
  progress: [],
  selectedTopic: null,
  selectedChapter: null,
  loading: false,
  error: null,
}

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload
    },
    setSelectedChapter: (state, action) => {
      state.selectedChapter = action.payload
    },
    updateChapterProgress: (state, action) => {
      const { topicId, chapterId, completed } = action.payload
      const topic = state.topics.find((t) => t.id === topicId)
      if (topic) {
        const chapter = topic.chapters.find((c) => c.id === chapterId)
        if (chapter) {
          chapter.completed = completed

          // Unlock next chapter if completed
          if (completed) {
            const chapterIndex = topic.chapters.findIndex((c) => c.id === chapterId)
            if (chapterIndex < topic.chapters.length - 1) {
              topic.chapters[chapterIndex + 1].unlocked = true
            }
          }

          // Update topic progress
          const completedChapters = topic.chapters.filter((c) => c.completed).length
          topic.progress = Math.round((completedChapters / topic.chapters.length) * 100)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false
        state.topics = action.payload
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchTopicProgress.fulfilled, (state, action) => {
        state.progress = action.payload
      })
  },
})

export const { setSelectedTopic, setSelectedChapter, updateChapterProgress } = topicsSlice.actions
export default topicsSlice.reducer

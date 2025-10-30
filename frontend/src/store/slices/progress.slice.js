import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  quizResults: {},
  chapterScores: {},
  topicScores: {},
}

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    saveQuizResult: (state, action) => {
      const { chapterId, score, totalQuestions, answers } = action.payload
      state.quizResults[chapterId] = {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        answers,
        completedAt: new Date().toISOString(),
      }
      state.chapterScores[chapterId] = Math.round((score / totalQuestions) * 100)
    },
    saveTopicQuizResult: (state, action) => {
      const { topicId, score, totalQuestions } = action.payload
      state.topicScores[topicId] = {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        completedAt: new Date().toISOString(),
      }
    },
  },
})

export const { saveQuizResult, saveTopicQuizResult } = progressSlice.actions
export default progressSlice.reducer

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth.slice.js"
import topicsReducer from "./slices/topic.slice.js"
import progressReducer from "./slices/progress.slice.js"
import tutorsReducer from "./slices/tutors.slice.js"
import forumReducer from "./slices/forum.slice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
    progress: progressReducer,
    tutors: tutorsReducer,
    forum: forumReducer,
  },
})

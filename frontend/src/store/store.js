import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import topicsReducer from "./slices/topicsSlice"
import progressReducer from "./slices/progressSlice"
import tutorsReducer from "./slices/tutorsSlice"
import forumReducer from "./slices/forumSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
    progress: progressReducer,
    tutors: tutorsReducer,
    forum: forumReducer,
  },
})

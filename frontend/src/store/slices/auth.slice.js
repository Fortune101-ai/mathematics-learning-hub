import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../../utils/api"

const loginUser = createAsyncThunk("auth/login", async (credentials, {rejectWithValue}) => {

    try {
        const response = await authAPI.login(credentials)
        const {token, ...user} = response.data.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        return user
    }catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed")
    }

})

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(userData)
    const { token, ...user } = response.data.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

const storedUser = localStorage.getItem("user")
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
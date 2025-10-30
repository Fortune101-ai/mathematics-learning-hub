import { createSlice } from "@reduxjs/toolkit"

const mockTutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 100,
    subjects: ["Functions", "Calculus", "Trigonometry"],
    bio: "Mathematics educator with 8 years of experience. Specialized in Grade 12 preparation.",
    availability: ["Monday 14:00-18:00", "Wednesday 14:00-18:00", "Friday 14:00-18:00"],
    totalSessions: 450,
    image: "/female-teacher.png",
  },
  {
    id: 2,
    name: "David Nkosi",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 100,
    subjects: ["Analytical Geometry", "Statistics", "Sequences and Series"],
    bio: "Passionate about making mathematics accessible and fun for all learners.",
    availability: ["Tuesday 15:00-19:00", "Thursday 15:00-19:00", "Saturday 09:00-13:00"],
    totalSessions: 320,
    image: "/male-teacher.png",
  },
  {
    id: 3,
    name: "Thandi Mbatha",
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 100,
    subjects: ["Functions", "Calculus", "Statistics"],
    bio: "Former matric examiner with proven track record of student success.",
    availability: ["Monday 16:00-20:00", "Wednesday 16:00-20:00", "Saturday 10:00-14:00"],
    totalSessions: 580,
    image: "/female-tutor.jpg",
  },
]

const initialState = {
  tutors: mockTutors,
  bookings: [],
  selectedTutor: null,
}

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    setSelectedTutor: (state, action) => {
      state.selectedTutor = action.payload
    },
    bookSession: (state, action) => {
      state.bookings.push({
        id: Date.now(),
        ...action.payload,
        status: "scheduled",
        bookedAt: new Date().toISOString(),
      })
    },
    cancelBooking: (state, action) => {
      const booking = state.bookings.find((b) => b.id === action.payload)
      if (booking) {
        booking.status = "cancelled"
      }
    },
    rescheduleBooking: (state, action) => {
      const { bookingId, newDateTime } = action.payload
      const booking = state.bookings.find((b) => b.id === bookingId)
      if (booking) {
        booking.dateTime = newDateTime
      }
    },
  },
})

export const { setSelectedTutor, bookSession, cancelBooking, rescheduleBooking } = tutorsSlice.actions
export default tutorsSlice.reducer

import { useState } from "react"
import LearnerLayout from "../components/learner/Learner_Layout"
import "../styles/Booking_Page.css"

function BookingPage() {
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookings, setBookings] = useState([])

  const tutors = [
    {
      id: 1,
      name: "Dr. Fortune Mahloane",
      specialty: "Pure Mathematics",
      rating: 4.8,
      hourlyRate: 250,
      availability: "Mon-Fri 3PM-8PM, Sat 10AM-6PM",
    },
    {
      id: 2,
      name: "Mr. Sipho Dlamini",
      specialty: "Applied Mathematics",
      rating: 4.7,
      hourlyRate: 280,
      availability: "Tue-Sat 2PM-9PM",
    },
    {
      id: 3,
      name: "Ms. Aisha Patel",
      specialty: "Statistics & Calculus",
      rating: 4.9,
      hourlyRate: 240,
      availability: "Mon-Fri 4PM-10PM, Sun 2PM-8PM",
    },
  ]

  const handleBookSession = () => {
    if (selectedTutor && bookingDate && bookingTime) {
      const newBooking = {
        id: Date.now(),
        tutorId: selectedTutor.id,
        tutorName: selectedTutor.name,
        date: bookingDate,
        time: bookingTime,
        status: "Confirmed",
      }
      setBookings([...bookings, newBooking])
      setSelectedTutor(null)
      setBookingDate("")
      setBookingTime("")
    }
  }

  return (
    <LearnerLayout>
      <div className="booking-page">
        <div className="booking-header">
          <h1 className="booking-title">Book a Tutor Session</h1>
          <p className="booking-subtitle">Connect with experienced tutors for personalized learning</p>
        </div>

        <div className="booking-container">
          <div className="tutors-section">
            <h2 className="section-title">Available Tutors</h2>
            <div className="tutors-list">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`tutor-card ${selectedTutor?.id === tutor.id ? "selected" : ""}`}
                  onClick={() => setSelectedTutor(tutor)}
                >
                  <div className="tutor-header">
                    <h3 className="tutor-name">{tutor.name}</h3>
                    <span className="tutor-rating">⭐ {tutor.rating}</span>
                  </div>
                  <p className="tutor-specialty">{tutor.specialty}</p>
                  <div className="tutor-details">
                    <span className="tutor-rate">R{tutor.hourlyRate}/hour</span>
                    <span className="tutor-availability">Availability: {tutor.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-form-section">
            {selectedTutor ? (
              <div className="booking-form">
                <h2 className="form-title">Book Session with {selectedTutor.name}</h2>

                <div className="form-group">
                  <label className="form-label">Select Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Select Time</label>
                  <select className="form-input" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                    <option value="">Choose a time</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                  </select>
                </div>

                <div className="booking-summary">
                  <p>Rate: R{selectedTutor.hourlyRate}</p>
                  <p>Duration: 1 hour</p>
                </div>

                <button className="book-btn" onClick={handleBookSession}>
                  Confirm Booking
                </button>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a tutor to book a session</p>
              </div>
            )}
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="bookings-history">
            <h2 className="section-title">Your Bookings</h2>
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <h4>{booking.tutorName}</h4>
                    <p>
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  <span className={`booking-status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LearnerLayout>
  )
}

export default BookingPage

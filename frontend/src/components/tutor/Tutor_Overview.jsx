function TutorOverview({ user }) {
  
  const stats = {
    totalSessions: 45,
    upcomingSessions: 3,
    averageRating: 4.8,
    totalEarnings: 4500,
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-[var(--color-text-secondary)] text-lg">Here's your tutoring overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-text-secondary)] mb-1">Total Sessions</div>
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">{stats.totalSessions}</div>
        </div>

        <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-text-secondary)] mb-1">Upcoming Sessions</div>
          <div className="text-3xl font-bold text-[var(--color-primary)]">{stats.upcomingSessions}</div>
        </div>

        <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-text-secondary)] mb-1">Average Rating</div>
          <div className="text-3xl font-bold text-[var(--color-accent)]">{stats.averageRating} ★</div>
        </div>

        <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
          <div className="text-sm text-[var(--color-text-secondary)] mb-1">Total Earnings</div>
          <div className="text-3xl font-bold text-[var(--color-success)]">R{stats.totalEarnings}</div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Upcoming Sessions</h3>
        <div className="text-[var(--color-text-secondary)]">No upcoming sessions scheduled</div>
      </div>
    </div>
  )
}

export default TutorOverview

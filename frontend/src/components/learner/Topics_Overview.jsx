import { useSelector } from "react-redux";

function TopicsOverview() {
  const { topics } = useSelector((state) => state.topics);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          Your Learning Journey
        </h2>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Master Grade 12 Mathematics one topic at a time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="bg-[var(--color-background)] rounded-[var(--radius-lg)] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[var(--color-border)]"
          >
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              {topic.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              {topic.description}
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  Progress
                </span>
                <span className="text-xs font-bold text-[var(--color-primary)]">
                  {topic.progress}%
                </span>
              </div>
              <div className="w-full bg-[var(--color-surface)] rounded-full h-2">
                <div
                  className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">
                {topic.chapters.length} chapters
              </span>
              <span className="text-[var(--color-primary)] font-medium">
                Start Learning →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicsOverview;

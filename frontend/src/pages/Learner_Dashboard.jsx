import { Routes, Route } from "react-router-dom";
import LearnerLayout from "../components/learner/Learner_Layout";
import TopicsOverview from "../components/learner/Topics_Overview.jsx";

function LearnerDashboard() {
  return (
    <LearnerLayout>
      <Routes>
        <Route path="/" element={<TopicsOverview />} />
      </Routes>
    </LearnerLayout>
  );
}

export default LearnerDashboard;

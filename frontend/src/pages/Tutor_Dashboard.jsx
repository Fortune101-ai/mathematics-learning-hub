import { useSelector } from "react-redux"
import TutorLayout from "../components/tutor/Tutor_Layout.jsx"
import TutorOverview from "../components/tutor/Tutor_Overview.jsx"

function TutorDashboard() {
  const { user } = useSelector((state) => state.auth)

  return (
    <TutorLayout>
      <TutorOverview user={user} />
    </TutorLayout>
  )
}

export default TutorDashboard

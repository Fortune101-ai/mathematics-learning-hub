import {Routes, Route, Navigate} from 'react-router-dom' 
import { useSelector } from 'react-redux'

function App() {
    const {user, isAithenticated} = useSelector(state => state.auth)

    return (
        <Routes>


        </Routes>
    )

}

export default App
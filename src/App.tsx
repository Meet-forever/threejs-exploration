import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './routes/home'
import ObjectTrackingPage from './routes/objectTrackingPage'

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/object_tracking" element={<ObjectTrackingPage />} />
            </Routes>
        </>
    )
}

export default App

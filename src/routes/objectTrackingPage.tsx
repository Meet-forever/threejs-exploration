import { ScrollControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ObjectTracking } from "../components/ObjectTracking"
import { Link } from "react-router-dom"


const ObjectTrackingPage = () => {
    return (
        <>
            <nav>
                <h1 className="heading">Object Tracking</h1>
                <Link to="/"><button className="nav-btn">Go back</button></Link>
            </nav>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Canvas>
                    <ScrollControls pages={6}>
                        <ObjectTracking />
                    </ScrollControls>
                </Canvas>
            </Suspense>
        </>
    )
}

export default ObjectTrackingPage
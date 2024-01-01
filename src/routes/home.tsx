import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div className="home-page">
      <h1>Threejs Exploration</h1>
        <hr/>
        <p>Project Links</p>
        <ul>
          <Link to="/object_tracking"><li>Object tracking</li></Link>
        </ul>
    </div>
  )
}
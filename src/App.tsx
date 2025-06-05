import Home from "./assets/Pages/Home"
import About from "./assets/Pages/About"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Monitoring from "./assets/Pages/Monitoring"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Monitoring" element={<Monitoring />} />
      </Routes>
    </Router>
  )
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer"
import Home from "./Page/Home"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      
      <Footer />
    </div>
  )
}

export default App

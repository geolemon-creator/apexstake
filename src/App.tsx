import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer"
import Home from "./Page/Home"
import Staking from "./Page/Staking";
import Referal from "./Page/Referal";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/referal" element={<Referal />} />
        </Routes>
        <Footer />
      </Router>
      
      
    </div>
  )
}

export default App

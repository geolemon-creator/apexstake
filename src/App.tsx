import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Page/Home";
import Staking from "./Page/Staking";
import Referal from "./Page/Referal";
import Contest from "./Page/Contest";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/referrals" element={<Referal />} />
          <Route path="/contest" element={<Contest />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

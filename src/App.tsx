import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Page/Home";
import Staking from "./Page/Staking";
import Referal from "./Page/Referal";
import Contest from "./Page/Contest";
import { TransactionsProvider } from "./Components/TransactionsContext";
import Farming from "./Page/Farming";
import Profile from "./Page/Profile";
import Conclusioin from "././Page/Conclusion"
import Transfers from "./Page/Transfers";

function App() {
  return (
    <div>
      <TransactionsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/referrals" element={<Referal />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/farming" element={<Farming />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/conclusioin" element={<Conclusioin />} />
            <Route path="/transfers" element={<Transfers />} />
          </Routes>
          <Footer />
        </Router>
      </TransactionsProvider>
    </div>
  );
}

export default App;

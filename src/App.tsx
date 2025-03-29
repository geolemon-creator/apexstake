import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Home from './Page/Home';
import Staking from './Page/Staking';
import Referal from './Page/Referal';
import Contest from './Page/Contest';
import { TransactionsProvider } from './Components/TransactionsContext';
import Farming from './Page/Farming';
import Profile from './Page/Profile';
import Conclusioin from '././Page/Conclusion';
import Transfers from './Page/Transfers';
import useAuth from './Hooks/useAuth';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

function App() {
  const { signIn } = useAuth();
  // @ts-ignore
  const [initData, setInitData] = useState<string>('');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const data = window.Telegram.WebApp.initData;

      setInitData(data);
      signIn(data);
    }
  }, [signIn]);
  console.log(window.Telegram.WebApp.initData, 'tgweap');
  return (
    <TransactionsProvider>
      <div className="app-container">
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
      </div>
    </TransactionsProvider>
  );
}

export default App;

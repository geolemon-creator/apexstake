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
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Deposite from './Page/Deposite';

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
  const { signIn, isAuth } = useAuth();
  const [initData, setInitData] = useState<string>('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const tonConnectConfig = {
    manifestUrl: 'https://work.lnx-usr.xyz/tonconnect-manifest.json',
    includeWallets: ['tonkeeper'], // Указываем только tonkeeper
  };

  useEffect(() => {
    // if (window.Telegram && window.Telegram.WebApp) {
    // const data = window.Telegram.WebApp.initData;

    // TEST
    const data =
      'query_id=AAEv2R53AgAAAC_ZHndRLkxP&user=%7B%22id%22%3A6293477679%2C%22first_name%22%3A%22LNX_USR%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22LNX_USR%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FWInqVK_OtErS4OZenPcmUQTsk4pKyS7FSeN9EXafyLh0UYA_-xNcGe5J5LEVDvTF.svg%22%7D&auth_date=1743635465&signature=kycyWeXf5-LKS-jZyNRJckcZvqyxceQmFGF2QcVKa2_XDx8jm8A1bWnUzrpRV9LmLWrN_4jkjTDladycW6UJAA&hash=5de5fa90d95c216126730c0e057c1335c79ce8e93df3cf453476a4fae3e59e8c';

    if (data) {
      // setInitData(data);

      // TEST
      setInitData(data);
    }
    // }
  }, [signIn]);

  useEffect(() => {
    if (initData) {
      // alert(initData);
      signIn(initData);
    }
  }, [initData]);

  if (!isAuth) {
    return <div>Loading...</div>;
  }

  return (
    <TonConnectUIProvider
      manifestUrl="https://work.lnx-usr.xyz/tonconnect-manifest.json"
      walletsRequiredFeatures={{
        sendTransaction: {
          minMessages: 2, // Кошелек должен поддерживать отправку хотя бы 2 сообщений
          extraCurrencyRequired: true, // Кошелек должен поддерживать дополнительную валюту в транзакциях
        },
      }}
    >
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
              <Route path="/deposite" element={<Deposite />} />
              <Route path="/transfers" element={<Transfers />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </TransactionsProvider>
    </TonConnectUIProvider>
  );
}

export default App;

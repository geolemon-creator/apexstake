import { NavLink } from 'react-router-dom';
import close from './../../Img/close.svg';

interface ConnectWalletModalProps {
  closeModal: () => void;
}

const ConnectWalletModal = ({ closeModal }: ConnectWalletModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="connect-wallet-div">
        <div className="connect-w-img-div">
          <img
            className="connect-w-close-img"
            onClick={closeModal} // Закрываем модалку по клику
            src={close}
          />
        </div>

        <div className="connect-wallet-text">
          <p className="connect-w-p">Подключите ваш кошелек</p>
          <p className="connect-w-conect-p">
            Для ввода/вывода средств подключайте свой TON кошелек
          </p>

          <NavLink to="/profile">
            <button className="connect-w-btn">Подключить кошелек TON</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;

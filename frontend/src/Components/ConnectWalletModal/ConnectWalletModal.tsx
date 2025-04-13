import { NavLink } from 'react-router-dom';
import close from './../../Img/close.svg';
import { useTranslation } from 'react-i18next';

interface ConnectWalletModalProps {
  closeModal: () => void;
}

const ConnectWalletModal = ({ closeModal }: ConnectWalletModalProps) => {
  const { t } = useTranslation();
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
          <p className="connect-w-p">{t('connect_wallet')}</p>
          <p className="connect-w-conect-p">
            {t('connect_wallet_description')}
          </p>

          <NavLink to="/profile">
            <button className="connect-w-btn">{t('connect_ton_wallet')}</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;

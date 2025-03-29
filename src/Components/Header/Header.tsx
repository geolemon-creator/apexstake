import { NavLink } from 'react-router-dom';
import { level } from '../../Components/Data';
import LevelModal from '../SelectLevelModal/LevelModal';
import LevelDetailModal from '../LevelDetailsModal/LevelDetailModal';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import arrowDownIcon from '../../Img/arrow-down.svg';
import { LevelData } from '../Type';
import InputDepositeModal from '../InputDepositeModal/InputDepositeModal';
import rightArrow from '../../Img/arrow-right.svg';
import { getDecodedAvatarUrl } from '../../Utils/decodeAvatar';

const Header = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [selectedLevelData, setSelectedLevelData] = useState<LevelData | null>(
    null
  );
  const [isLevelsListOpen, setIsLevelsListOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Получаем данные из localStorage
    const authData = localStorage.getItem('auth');

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData?.access_token) {
        setUser(parsedAuthData.user); // Сохраняем данные пользователя
      }
    }
  }, []);

  const handleCloseLevelsList = () => {
    setIsLevelsListOpen(false);
  };

  const handleCloseDepositeModal = () => {
    setIsDepositeModalOpen(false);
  };

  const handleSelectLevel = (id: number) => {
    setIsLevelsListOpen(false);
    setIsDetailModalOpen(true);
  };

  const handleOpenDepositeModal = (level: LevelData) => {
    setIsDetailModalOpen(false);
    setIsDepositeModalOpen(true);
    setSelectedLevelData(level);
  };

  const handleDepositeSubmit = (amount: number, level: LevelData) => {
    console.log(amount, 'amount');
    console.log(selectedLevel, level);
    setIsDepositeModalOpen(false);
    setSelectedLevelId(level.id);
  };

  const selectedLevel = level.find((level) => level.id === selectedLevelId);

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  const avatarUrl = getDecodedAvatarUrl(user.avatar);

  return (
    <div className={styles.headerContainer}>
      <NavLink className={styles.headerUser} to="/profile">
        <img
          width={32}
          height={32}
          style={{ borderRadius: '100%' }}
          src={avatarUrl}
          alt="right-arrow"
        />
        <p>{user.username}</p>
        <img src={rightArrow} alt="right-arrow" />
      </NavLink>

      {selectedLevel && (
        <div
          className={styles.headerLevel}
          onClick={() => setIsLevelsListOpen(true)}
        >
          <img src={selectedLevel.img} alt="down-arrow" />
          <p className="level-p">{selectedLevel.title}</p>
          <img src={arrowDownIcon} alt="down-arrow" />
        </div>
      )}
      {!selectedLevel && (
        <div
          className={styles.headerLevel}
          onClick={() => setIsLevelsListOpen(true)}
        >
          <p className="level-p">Выбор уровня</p>
          <img src={arrowDownIcon} alt="down-arrow" />
        </div>
      )}

      {isDetailModalOpen && (
        <LevelDetailModal
          selectedLevelId={selectedLevelId}
          handleOpenDepositeModal={handleOpenDepositeModal}
        />
      )}

      {isDepositeModalOpen && (
        <InputDepositeModal
          level={selectedLevelData}
          handleDepositeSubmit={handleDepositeSubmit}
          onClose={handleCloseDepositeModal}
        />
      )}

      <LevelModal
        isLevelsListOpen={isLevelsListOpen}
        handleCloseLevelsList={handleCloseLevelsList}
        level={level}
        selectedLevel={selectedLevelId}
        handleSelect={handleSelectLevel}
      />
    </div>
  );
};

export default Header;

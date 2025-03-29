import { NavLink } from 'react-router-dom';
import { level } from '../../Components/Data';
import LevelModal from '../SelectLevelModal/LevelModal';
import LevelDetailModal from '../LevelDetailsModal/LevelDetailModal';
import { useState } from 'react';
import styles from './Header.module.css';
import arrowRightIcon from '../../Img/arrow-right.svg';
import arrowDownIcon from '../../Img/arrow-down.svg';
import { LevelData } from '../Type';
import InputDepositeModal from '../InputDepositeModal/InputDepositeModal';

const Header = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [selectedLevelData, setSelectedLevelData] = useState<LevelData | null>(
    null
  );
  const [isLevelsListOpen, setIsLevelsListOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);

  const handleCloseLevelsList = () => {
    setIsLevelsListOpen(false);
  };

  const handleCloseDepositeModal = () => {
    setIsDepositeModalOpen(false);
  };

  const handleSelectLevel = (id: number) => {
    console.log(id);
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

  return (
    <div className={styles.headerContainer}>
      <NavLink className={styles.headerUser} to="/profile">
        <div className="user-icon"></div>
        <p>UserName</p>
        <img src={arrowRightIcon} alt="right-arrow" />
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

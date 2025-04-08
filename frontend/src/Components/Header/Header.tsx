import { NavLink } from 'react-router-dom';
import LevelModal from '../SelectLevelModal/LevelModal';
import LevelDetailModal from '../LevelDetailsModal/LevelDetailModal';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import arrowDownIcon from '../../Img/arrow-down.svg';
import { LevelData } from '../Type';
import InputDepositeModal from '../InputDepositeModal/InputDepositeModal';
import rightArrow from '../../Img/arrow-right.svg';
import { getDecodedAvatarUrl } from '../../Utils/decodeAvatar';
import { levelsApi, stakingApi } from '../../Api/stakingApi';
import { AxiosError } from 'axios';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
  const [isLevelsListOpen, setIsLevelsListOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStakingDepositeOpen, setIsStakingDepositeOpen] = useState(false);

  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [selectedLevelDetail, setSelectedLevelDetail] = useState<LevelData>();

  const [levels, setLevels] = useState<LevelData[]>([]);
  const [user, setUser] = useState<any>(null);
  const { updateUser } = useAuth();
  const storedStaking = JSON.parse(
    localStorage.getItem('current_staking') || '{}'
  );

  useEffect(() => {
    // Получаем данные из localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levelsList: LevelData[] = await levelsApi.getLevelsList();
        setLevels(levelsList);
      } catch (err) {
        // alert(err);
        // alert('Ошибка загрузки уровней');
        console.error(err);
      }
    };

    fetchLevels();
  }, []);

  const handleCloseLevelsList = () => {
    setIsLevelsListOpen(false);
  };

  const handleCloseDepositeModal = () => {
    setIsStakingDepositeOpen(false);
  };

  // @ts-ignore
  const handleSelectLevel = (level: number) => {
    setSelectedLevelId(level);
    setIsLevelsListOpen(false);
    setIsDetailModalOpen(true);
  };

  const handleOpenStakingDeposite = (level: LevelData) => {
    if (user?.selected_level) {
      alert(
        `Вы хотите поменять текущий уровень? ${user.selected_level} на ${level.level}`
      );
      if (user.selected_level >= level.level) {
        alert('Для смены уровня нужно выбрать уровень выше текущего');
      } else {
        setSelectedLevelDetail(level);
        setIsDetailModalOpen(false);
        setIsStakingDepositeOpen(true);
      }
    } else {
      setSelectedLevelDetail(level);
      if (level.min_deposite > user.balance) {
        // TODO: Редирект на страницу пополнения
        alert('Не достаточно средств на балансе');
      } else {
        setIsDetailModalOpen(false);
        setIsStakingDepositeOpen(true);
      }
    }
  };

  const handleDepositeSubmit = async (amount: number, level: LevelData) => {
    if (user.selected_level) {
      try {
        await stakingApi.changeStaking(amount, level.level);

        setIsStakingDepositeOpen(false);
        updateUser(user.id);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        const errorMessage = error.response?.data?.error || 'Произошла ошибка';
        alert(errorMessage);
      }
    } else {
      try {
        await stakingApi.openStaking(amount, level.level);

        setIsStakingDepositeOpen(false);
        updateUser(user.id);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        const errorMessage = error.response?.data?.error || 'Произошла ошибка';
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    const stakingRaw = localStorage.getItem('current_staking');
    if (!stakingRaw) return;

    try {
      const stakingData = JSON.parse(stakingRaw);
      const endDate = new Date(stakingData.end_date).getTime();
      const now = new Date().getTime();
      const delay = endDate - now;

      console.log('setted');
      if (delay > 0) {
        setTimeout(() => {
          location.reload(); // Обновит страницу ровно в end_date
        }, delay);
      }
    } catch (e) {
      console.error('Failed to parse staking data from localStorage:', e);
    }
  }, []);

  if (!levels) {
    return <div>...</div>;
  }

  const selectedLevel: LevelData | undefined = levels.find(
    (level) => level.level === user.selected_level
  );

  const avatarUrl = getDecodedAvatarUrl(user?.avatar);
  console.log('current-staking', storedStaking);
  return (
    <div className={styles.headerContainer}>
      <NavLink
        className={styles.headerUser}
        style={{ marginRight: '5px' }}
        to="/profile"
      >
        <img
          width={32}
          height={32}
          style={{ borderRadius: '100%' }}
          src={avatarUrl}
          alt="right-arrow"
        />
        <p>{user?.username}</p>
        <img src={rightArrow} alt="right-arrow" />
      </NavLink>

      {selectedLevel && (
        <div
          className={styles.headerLevel}
          onClick={() => setIsLevelsListOpen(true)}
        >
          <img
            src={levelsAdditional[selectedLevel.level].icon}
            alt="down-arrow"
          />
          <p className="level-p">
            {levelsAdditional[selectedLevel.level].title}
          </p>
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
          handleOpenStakingDeposite={handleOpenStakingDeposite}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}

      {isStakingDepositeOpen && (
        <InputDepositeModal
          level={selectedLevelDetail}
          handleDepositeSubmit={handleDepositeSubmit}
          onClose={handleCloseDepositeModal}
        />
      )}

      <LevelModal
        isLevelsListOpen={isLevelsListOpen}
        handleCloseLevelsList={handleCloseLevelsList}
        levelsList={levels}
        selectedLevel={user?.selected_level}
        handleSelect={handleSelectLevel}
      />
    </div>
  );
};

export default Header;

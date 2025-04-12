import { NavLink } from 'react-router-dom';
import LevelModal from '../SelectLevelModal/LevelModal';
import LevelDetailModal from '../LevelDetailsModal/LevelDetailModal';
import { useEffect } from 'react';
import styles from './Header.module.css';
import arrowDownIcon from '../../Img/arrow-down.svg';
import { LevelData } from '../Type';
import InputDepositeModal from '../InputDepositeModal/InputDepositeModal';
import rightArrow from '../../Img/arrow-right.svg';
import { getDecodedAvatarUrl } from '../../Utils/decodeAvatar';
import { stakingApi } from '../../Api/stakingApi';
import { AxiosError } from 'axios';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLevels,
  loadUserFromStorage,
  setIsLevelsListOpen,
  setIsDetailModalOpen,
  setIsStakingDepositeOpen,
  setSelectedLevelId,
  setSelectedLevelDetail,
} from '../../Features/headerUISlice';
import { RootState, AppDispatch } from '../../store';


const Header = () => {
  const { updateUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const {
    isLevelsListOpen,
    isDetailModalOpen,
    isStakingDepositeOpen,
    selectedLevelId,
    selectedLevelDetail,
    levels,
    user,
  } = useSelector((state: RootState) => state.headerUI);

  useEffect(() => {
    dispatch(fetchLevels());
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleSelectLevel = (level: number) => {
    dispatch(setSelectedLevelId(level));
    dispatch(setIsLevelsListOpen(false));
    dispatch(setIsDetailModalOpen(true));
  };

  const handleOpenStakingDeposite = (level: LevelData) => {
    if (user?.selected_level) {
      if (user.selected_level >= level.level) {
        alert('Для смены уровня нужно выбрать уровень выше текущего');
      } else {
        dispatch(setSelectedLevelDetail(level));
        dispatch(setIsDetailModalOpen(false));
        dispatch(setIsStakingDepositeOpen(true));
      }
    } else {
      if (level.min_deposite > user.balance) {
        alert('Не достаточно средств на балансе');
      } else {
        dispatch(setSelectedLevelDetail(level));
        dispatch(setIsDetailModalOpen(false));
        dispatch(setIsStakingDepositeOpen(true));
      }
    }
  };

  const handleCloseLevelsList = () => {
    dispatch(setIsLevelsListOpen(false));
  };

  const handleCloseDepositeModal = () => {
    dispatch(setIsStakingDepositeOpen(false));
  };

  const handleDepositeSubmit = async (amount: number, level: LevelData) => {
    if (user.selected_level) {
      try {
        await stakingApi.changeStaking(amount, level.level);

        setIsStakingDepositeOpen(false);
        updateUser(user.id);
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
        }, 100);
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

      if (delay > 0) {
        setTimeout(() => {
          location.reload();
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
          onClick={() => dispatch(setIsLevelsListOpen(true))}
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
          onClick={() => dispatch(setIsLevelsListOpen(true))}
        >
          <p className="level-p">Выбор уровня</p>
          <img src={arrowDownIcon} alt="down-arrow" />
        </div>
      )}

      {isDetailModalOpen && (
        <LevelDetailModal
          selectedLevelId={selectedLevelId}
          handleOpenStakingDeposite={handleOpenStakingDeposite}
          onClose={() => dispatch(setIsDetailModalOpen(false))}
        />
      )}

      {isStakingDepositeOpen && selectedLevelDetail && (
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

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { levelsApi } from '../Api/stakingApi';
import { LevelData } from '../Components/Type';

interface StakingUIState {
  isLevelsListOpen: boolean;
  isDetailModalOpen: boolean;
  isStakingDepositeOpen: boolean;
  selectedLevelId: number | null;
  selectedLevelDetail: LevelData | null;
  levels: LevelData[];
  user: any;
}

const initialState: StakingUIState = {
  isLevelsListOpen: false,
  isDetailModalOpen: false,
  isStakingDepositeOpen: false,
  selectedLevelId: null,
  selectedLevelDetail: null,
  levels: [],
  user: null,
};

// Получение уровней
export const fetchLevels = createAsyncThunk(
  'stakingUI/fetchLevels',
  async () => {
    const levels = await levelsApi.getLevelsList();
    return levels;
  }
);

// Получение пользователя из localStorage
export const loadUserFromStorage = createAsyncThunk(
  'headerUI/loadUser',
  () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
);

const headerUISlice = createSlice({
  name: 'headerUI',
  initialState,
  reducers: {
    setIsLevelsListOpen: (state, action: PayloadAction<boolean>) => {
      state.isLevelsListOpen = action.payload;
    },
    setIsDetailModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDetailModalOpen = action.payload;
    },
    setIsStakingDepositeOpen: (state, action: PayloadAction<boolean>) => {
      state.isStakingDepositeOpen = action.payload;
    },
    setSelectedLevelId: (state, action: PayloadAction<number | null>) => {
      state.selectedLevelId = action.payload;
    },
    setSelectedLevelDetail: (
      state,
      action: PayloadAction<LevelData | null>
    ) => {
      state.selectedLevelDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const {
  setIsLevelsListOpen,
  setIsDetailModalOpen,
  setIsStakingDepositeOpen,
  setSelectedLevelId,
  setSelectedLevelDetail,
} = headerUISlice.actions;

export default headerUISlice.reducer;

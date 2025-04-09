import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { levelsApi, stakingApi } from '../Api/stakingApi';
import { calculateTimeRemainingAndProgress } from '../Components/StakingBalance/StakingBalanceUtils';
import { LevelData, UserStakingDetails } from '../Components/Type';

interface StakingState {
  userStakingData: UserStakingDetails | null;
  progress: number;
  timeRemaining: string;
  level: LevelData | null;
  profit: number;
  isModalOpen: boolean;
  isLoading: boolean;
}

const storedProfit = localStorage.getItem('profitPercentage');

const initialState: StakingState = {
  userStakingData: null,
  progress: 0,
  timeRemaining: '',
  level: null,
  profit: storedProfit ? Number(storedProfit) : 0,
  isModalOpen: false,
  isLoading: true,
};

// thunk: получить данные по стейкингу
export const fetchStakingDetails = createAsyncThunk(
  'staking/fetchStakingDetails',
  async (_, { dispatch }) => {
    const data = await stakingApi.getStakingMe();

    if (!data) {
      dispatch(setUserStakingData(null));
      localStorage.removeItem('current_staking');
      return;
    }

    const { timeRemaining, progress } = calculateTimeRemainingAndProgress(
      data.start_date,
      data.end_date
    );

    const amount = parseFloat(data.amount ?? '0');
    const profit = data.current_profit ?? 0;
    const profitPercentage = amount > 0 ? (profit / amount) * 100 : 0;

    dispatch(setUserStakingData(data));
    dispatch(setTimeRemaining(timeRemaining));
    dispatch(setProgress(Number(progress)));
    dispatch(setProfit(profitPercentage));
  }
);

export const fetchProfitPercentage = createAsyncThunk(
  'staking/fetchProfitPercentage',
  async (_, { dispatch }) => {
    const percentage = await stakingApi.getStakingProfit();

    if (!percentage) {
      dispatch(setProfit(0));
      localStorage.removeItem('profitPercentage');
    }

    dispatch(setProfit(Number(percentage.profit)));
    localStorage.setItem('profitPercentage', percentage.profit);
  }
);

// thunk: получить уровень
export const fetchLevelDetails = createAsyncThunk(
  'staking/fetchLevelDetails',
  async (level: string, { dispatch }) => {
    const levelData = await levelsApi.getLevelDetails(Number(level));
    dispatch(setLevel(levelData));
  }
);

const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    setUserStakingData(
      state,
      action: PayloadAction<UserStakingDetails | null>
    ) {
      state.userStakingData = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setTimeRemaining(state, action: PayloadAction<string>) {
      state.timeRemaining = action.payload;
    },
    setLevel(state, action: PayloadAction<LevelData>) {
      state.level = action.payload;
    },
    setProfit(state, action: PayloadAction<number>) {
      state.profit = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStakingDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStakingDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStakingDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setUserStakingData,
  setProgress,
  setTimeRemaining,
  setLevel,
  setProfit,
  setModalOpen,
  setLoading,
} = stakingSlice.actions;

export default stakingSlice.reducer;

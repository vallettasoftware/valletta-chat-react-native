import { createSlice } from '@reduxjs/toolkit';

interface userState {
  email: string | null;
  token: string | null;
  refreshToken: string | null;
  headphone: {
    audioJack: boolean;
    bluetooth: boolean;
  };
}

const initialState: userState = {
  email: null,
  token: null,
  refreshToken: null,
  headphone: {
    audioJack: false,
    bluetooth: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUserInfo: (state) => {
      state.email = null;
      state.token = null;
      state.refreshToken = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setHeadphone: (state, action) => {
      state.headphone = action.payload;
    },
  },
});

export const { setAuthToken, setUserEmail, setHeadphone, setRefreshToken, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;

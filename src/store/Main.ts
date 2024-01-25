import { createSlice } from '@reduxjs/toolkit';
import { IMenuComponent } from './models/common/Menu';
import { Room } from './models/responses/Room';
import { disconnectActionType } from './utils/actions';

type mainState = {
  menuComponent: IMenuComponent;
  listNeedUpdate: boolean;
  conferences: Room[];
};

const initialMenu = {
  name: 'ConferenceSettings',
} as IMenuComponent;

const initialState: mainState = {
  menuComponent: initialMenu,
  listNeedUpdate: false,
  conferences: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    startRefresh: (state, action) => {
      state.listNeedUpdate = action.payload;
    },
    setMenuComponent: (state, action) => {
      state.menuComponent = action.payload;
    },
    setChats: (state, action) => {
      state.conferences = action.payload;
    },
  },
  extraReducers: {
    [disconnectActionType]: (state, action) => ({
      ...state,
      menuComponent: initialMenu,
    }),
  },
});

export const { startRefresh, setMenuComponent, setChats } = mainSlice.actions;
export default mainSlice.reducer;

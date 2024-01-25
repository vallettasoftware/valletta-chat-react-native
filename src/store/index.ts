import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './User';
import chatReducer from './conference/data';
import mainReducer from './Main';
import messagesReducer from './conference/messages';

const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
    conferenceData: chatReducer,
    conferenceMessages: messagesReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

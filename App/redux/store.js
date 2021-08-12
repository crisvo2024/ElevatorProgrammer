import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './features/connectionReducer';
import levelsReducer from './features/levelsReducer';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    levels: levelsReducer,
  },
});

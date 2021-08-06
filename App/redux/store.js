import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './features/connection/connectionReducer';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
  },
});

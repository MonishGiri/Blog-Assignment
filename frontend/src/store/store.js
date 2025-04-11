import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/slice/userSlice'

const store = configureStore({
  reducer: {
    auth: userReducer, 
  },
});

export default store;

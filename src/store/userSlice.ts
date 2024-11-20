import { createSlice } from '@reduxjs/toolkit';
import { TokenType, UserType } from '../types';

interface initialStateInterface {
  user: UserType | null;
  token: TokenType | null;
}

const loadTokenFromStorage = () => {
  const storedToken = localStorage.getItem('token');
  return typeof storedToken == 'string' && storedToken
    ? JSON?.parse(storedToken)
    : null;
};

const initialState: initialStateInterface = {
  user: null,
  token: loadTokenFromStorage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem('token', JSON.stringify(token));
    },
    setTokenCredentials: (state, action) => {
      const token = action.payload;

      state.token = token;
      localStorage.setItem('token', JSON.stringify(token));
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setTokenCredentials, setUserData } =
  userSlice.actions;

export default userSlice.reducer;

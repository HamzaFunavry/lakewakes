import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/LoginResponse';

export const userKey = 'userKey';
export interface IUserState {
  user: User;
  isLoggedIn: boolean;
  // used to show splash screen while user data is being loaded from async storage
  isLoadingStorageData: boolean;
  // if user is logging out by their own choice
  isLoggingOut: boolean;
  // or when the session is expired
  isSessionExpiredAndLoggingOut: boolean;
}
const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  // always true when app loads
  isLoadingStorageData: true,
  isLoggingOut: false,
  isSessionExpiredAndLoggingOut: false,
};

// WARNING https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810014208
// always add unique names to your createAsyncThunk calls !

const loadUserFromStorage = createAsyncThunk('user/loadFromStorage', () => {
  return AsyncStorage.getItem(userKey);
});

const logOutUser = createAsyncThunk('user/logoutUser', () => {
  return AsyncStorage.removeItem(userKey);
});

const loginUser = createAsyncThunk('user/loginUser', async (user: User) => {
  await AsyncStorage.setItem(userKey, JSON.stringify(user));
  return user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  // use the builder pattern its easier to understand
  extraReducers: (builder) => {
    builder
      .addCase(
        loadUserFromStorage.fulfilled,
        (state, action: PayloadAction<string>) => {
          const { payload } = action;
          const user = JSON.parse(payload);
          if (user) {
            state.isLoadingStorageData = false;
            state.isLoggedIn = true;
            state.user = user;
          } else {
            state.isLoadingStorageData = false;
            state.isLoggedIn = false;
            state.user = null;
          }
        },
      )
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        const { payload } = action;
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.isLoadingStorageData = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

const userReducer = userSlice.reducer;
export { userReducer, loadUserFromStorage, logOutUser, loginUser };

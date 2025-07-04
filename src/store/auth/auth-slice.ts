import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const.ts';
import { logoutAction } from './auth-actions.ts';

interface AuthState {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string | null>) {
      state.userEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = null;
    });
  },
});

export const { setAuthorizationStatus, setUserEmail } = authSlice.actions;
export default authSlice.reducer;

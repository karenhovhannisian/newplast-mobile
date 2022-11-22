import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './thunks';

interface AuthState {
  password: string;
  username: string;
  showModal: boolean;
  showFailMessage: boolean;
  mnor: string;
  isLoggedIn: boolean;
  perm: any;
}

const initialState: AuthState = {
  password: '',
  username: '',
  showModal: false,
  showFailMessage: false,
  mnor: '',
  isLoggedIn: false,
  perm: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    attemptLogOut: state => {
      state.showFailMessage = false;
      state.mnor = '';
      state.password = '';
    },
    attemptLogOutSuccess: state => {
      state.showModal = !state.showModal;
      state.showFailMessage = false;
    },
    authLogOut: state => {
      state.isLoggedIn = false;
      state.mnor = '';
      state.password = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, action: any) => {
      state.perm = action.payload.perm;
      state.mnor = action.payload.mnor;
      state.password = action.payload.password;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      state.showFailMessage = false;
    });
    builder.addCase(signIn.rejected, state => {
      state.showFailMessage = true;
    });
  },
});

export const { attemptLogOut, attemptLogOutSuccess, authLogOut } = authSlice.actions;

export default authSlice.reducer;

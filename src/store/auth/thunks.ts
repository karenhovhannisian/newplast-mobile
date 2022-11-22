import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../api/APIServices';
import { LogInFormData } from '../../models/auth';

export const signIn = createAsyncThunk('auth/login', async (credentials: LogInFormData) => {
  const loginFormData = new FormData();

  loginFormData.append('sl', `j,${credentials?.username},${credentials?.password},perm`);

  return await AuthService.logIn(loginFormData)
    .then(async res => {
      const data = await res.json();

      if (Array.isArray(data)) {
        return Promise.resolve({
          username: credentials.username,
          password: credentials.password,
          mnor: data[0].mnor,
          perm: data[0].perm,
        });
      }
      return Promise.reject();
    })
    .catch(() => {
      return Promise.reject();
    });
});

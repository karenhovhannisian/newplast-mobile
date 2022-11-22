import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from '../../api/APIServices';

export const getDebtList = createAsyncThunk('debts/getDebtList', async () => {
  return await APIServices.getDebtList().then(async res => {
    const data = await res.json();
    return Promise.resolve(data);
  });
});

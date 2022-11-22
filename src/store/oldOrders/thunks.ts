import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from '../../api/APIServices';

export const getOldOrders = createAsyncThunk(
  'orders/getOldOrders',
  async () =>
    await APIServices.getOldOrders().then(async res => {
      const data = await res.json();
      return Promise.resolve(data);
    }),
);

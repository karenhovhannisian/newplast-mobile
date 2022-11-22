import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from '../../api/APIServices';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () =>
    await APIServices.getProducts().then(async res => {
      const data = await res.json();
      return Promise.resolve(data);
    }),
);

export const getProductsType = createAsyncThunk(
  'products/getProductsType',
  async () =>
    await APIServices.getProductsType().then(async res => {
      const data = await res.json();
      return Promise.resolve(data);
    }),
);

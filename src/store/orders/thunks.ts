import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from '../../api/APIServices';
import { DeleteOrderFetchedData } from '../../models/orders';

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (data: { orderId: number; body: Array<DeleteOrderFetchedData> }) =>
    await APIServices.sendOrderList(data.body),
);

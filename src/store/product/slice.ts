import { createSlice } from '@reduxjs/toolkit';
import { IFilterItem, IProduct, IProductInfo, IProductType } from '../../models/product';
import { getProductsTypes } from '../../utils/helpers';
import { getProducts, getProductsType } from './thunks';

interface ProductState {
  loaderProducts: boolean;
  products: Array<IProduct>;
  productTypes: Array<IProductType>;
  productsFilters: Array<IFilterItem>;
  productsInfo: IProductInfo;
  isLoadingProductInfo: boolean;
}

const initialState: ProductState = {
  loaderProducts: false,
  products: [],
  productTypes: [],
  productsFilters: [],
  productsInfo: {},
  isLoadingProductInfo: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.loaderProducts = false;
      state.products = action.payload;
      state.productsFilters = getProductsTypes(action.payload);
    });
    builder.addCase(getProducts.pending, state => {
      state.loaderProducts = true;
    });
    builder.addCase(getProducts.rejected, state => {
      state.loaderProducts = false;
    });
    builder.addCase(getProductsType.fulfilled, (state, action: any) => {
      state.productTypes = action.payload;
    });
    // builder.addCase(
    //   getProductInfo.fulfilled,
    //   (
    //     state,
    //     action: PayloadAction<{ data: Array<IProductDetails>; args: IGetProductInfoReqData }>,
    //   ) => {
    //     const firstItem = action.payload.data[0] || {
    //       psize: action.payload.args.value,
    //       products_id: action.payload.args.id,
    //       gin: '-1',
    //     };

    //     const product = state.productsInfo[action.payload.args.id];
    //     if (!product) {
    //       state.productsInfo[firstItem.products_id] = [firstItem];
    //     } else {
    //       const size = state.productsInfo[firstItem.products_id].findIndex(
    //         i => i.size_id === firstItem.size_id,
    //       );
    //       if (size === -1) {
    //         state.productsInfo[firstItem.products_id] = [
    //           ...state.productsInfo[firstItem.products_id],
    //           firstItem,
    //         ];
    //       } else {
    //         const newSizes = state.productsInfo[firstItem.products_id].map((item, index) =>
    //           index === size ? firstItem : item,
    //         );
    //         state.productsInfo[firstItem.products_id] = newSizes;
    //       }
    //     }
    //     state.isLoadingProductInfo = false;
    //   },
    // );
    // builder.addCase(getProductInfo.pending, state => {
    //   state.isLoadingProductInfo = true;
    // });
    // builder.addCase(getProductInfo.rejected, state => {
    //   state.isLoadingProductInfo = false;
    // });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;

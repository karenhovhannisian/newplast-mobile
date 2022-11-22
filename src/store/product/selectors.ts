import { RootState } from '..';

export const getProductsSelector = (state: RootState) => state.product.products;
export const getProductsTypesSelector = (state: RootState) => state.product.productTypes;
export const getLoaderProducts = (state: RootState) => state.product.loaderProducts;
export const getProductsFilters = (state: RootState) => state.product.productsFilters;
export const getProductsInfoSelector = (state: RootState) => state.product.productsInfo;
export const isLoadingProductInfo = (state: RootState) => state.product.isLoadingProductInfo;

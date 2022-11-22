import { RootState } from '..';

export const getDebtsListSelector = (state: RootState) => state.debts.debtList;
export const getLoaderDebtList = (state: RootState) => state.debts.loaderDebtList;
export const getDebtsToRender = (state: RootState) => state.debts.debtsToRender;

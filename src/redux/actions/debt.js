import MakeActionCreator from '../../helpers/utilities/MakeActionCreator';

export const GET_DEBT_LIST = 'GET_DEBT_LIST';
export const getDebtList = MakeActionCreator(GET_DEBT_LIST);
export const GET_DEBT_LIST_SUCCESS = 'GET_DEBT_LIST_SUCCESS';
export const getDebtListSuccess = MakeActionCreator(
  GET_DEBT_LIST_SUCCESS,
  'debtList',
);

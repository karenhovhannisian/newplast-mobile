import { RootState } from '..';

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getMnor = (state: RootState) => state.auth.mnor;
export const getIsShowModal = (state: RootState) => state.auth.showModal;
export const getPermissions = (state: RootState) => state.auth.perm;

import MakeActionCreator from "../../helpers/utilities/MakeActionCreator";

export const ATTEMPT_SIGN_IN = "ATTEMPT_SIGN_IN";
export const attemptSignIn = MakeActionCreator(ATTEMPT_SIGN_IN, 'User', 'pass');
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const signInSuccess = MakeActionCreator(SIGN_IN_SUCCESS, 'pass', 'User');


export const ATTEMPT_LOG_OUT = "ATTEMPT_LOG_OUT";
export const attemptLogOut = MakeActionCreator(ATTEMPT_LOG_OUT, );
export const ATTEMPT_LOG_OUT_CANCEL = "ATTEMPT_LOG_OUT_CANCEL";
export const attemptLogOutCancel = MakeActionCreator(ATTEMPT_LOG_OUT_CANCEL, );
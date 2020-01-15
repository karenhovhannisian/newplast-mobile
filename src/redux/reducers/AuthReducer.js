import {ATTEMPT_LOG_OUT, ATTEMPT_LOG_OUT_SUCCESS, SIGN_IN_FAIL, SIGN_IN_SUCCESS} from "../actions";

const defaultState = {
    pass: '',
    showModal: false,
    showFailMessage: null,
    mnor: ''
};

const AuthReducer = (state = defaultState, action) => {
    const {type} = action;
    console.log(type)
    switch (type) {
        case  SIGN_IN_SUCCESS:
            return {
                ...state,
                mnor: action.mnor,
                showFailMessage: false
            };
            case  SIGN_IN_FAIL:
            return {
                ...state,
                showFailMessage: true
            };
            case  ATTEMPT_LOG_OUT:
            return {
                ...state,
                // showModal: !state.showModal,
                showFailMessage: null,
                mnor: '',
                pass:''
            };
            case  ATTEMPT_LOG_OUT_SUCCESS:
            return {
                ...state,
                showModal: !state.showModal,
                showFailMessage: null,

            };
        default:
            return state
    }
};
export default AuthReducer;

import {ATTEMPT_LOG_OUT, SIGN_IN_SUCCESS} from "../actions";

const defaultState = {
    pass: '',
    showModal: false,
    mnor: ''
};

const AuthReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  SIGN_IN_SUCCESS:
            return {
                ...state,
                mnor: action.mnor
            };
            case  ATTEMPT_LOG_OUT:
            return {
                ...state,
                showModal: !state.showModal
            };
        default:
            return state
    }
};
export default AuthReducer;

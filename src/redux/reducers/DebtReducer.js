import {ATTEMPT_LOG_OUT, GET_DEBT_LIST, GET_DEBT_LIST_SUCCESS} from "../actions";

const defaultState = {
    debtList: [],
    loaderDebtList: false
};

const DebtReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_DEBT_LIST:
            return {
                ...state,
                loaderDebtList: true
            };
            case  GET_DEBT_LIST_SUCCESS:
            return {
                ...state,
                debtList: action.debtList,
                loaderDebtList: false
            };
        case  ATTEMPT_LOG_OUT:
            return {
                ...state,
                debtList: [],
                loaderDebtList: false
            };
        default:
            return state
    }
};
export default DebtReducer;

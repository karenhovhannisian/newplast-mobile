import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {
    CONFIRM_ORDER, confirmOrderSuccess,
    GET_CUSTOMER_LIST,
    GET_MANAGER_LIST,
    getCustomerListSuccess,
    getManagerListSuccess, SEND_ORDER_LIST,
    sendOrderListSuccess
} from "../actions";
import cache from "../../Common/Cache";
import constants from "../../configs/contsants";

const defaultState = {
    pass: null,
    user: null,
};

cache.getItem("user", function(err, value){
        defaultState.user = value
});


cache.getItem("login", function(err, value){
    defaultState.pass = value
});

function* getManagerList({}) {
    const bodyFormData = new FormData();
    bodyFormData.append('sl', `j,${defaultState.user},${defaultState.pass},mens`);
    try {
        const options = {
            method: "POST",
            url: `${constants.apiUrl}`,
            credentials: "include",
            data: bodyFormData
        };
        const response = yield call(axios, options);
        yield put(getManagerListSuccess(response.data));
    } catch (err) {
        console.log(err);
    }
}

function* getCustomerList({}) {
    const bodyFormData = new FormData();
    bodyFormData.append('sl', `j,${defaultState.user},${defaultState.pass},gynker`);
    try {
        const options = {
            method: "POST",
            url: `${constants.apiUrl}`,
            credentials: "include",
            data: bodyFormData
        };
        const response = yield call(axios, options);
        yield put(getCustomerListSuccess(response.data));
    } catch (err) {
        console.log(err);
    }
}

function* sendOrderList({data}) {
    const bodyFormData = new FormData();
    bodyFormData.append('sl', `j,${defaultState.user},${defaultState.pass},save`);
    bodyFormData.append('data', JSON.stringify(...data));
    try {
        const options = {
            method: "POST",
            url: `${constants.apiUrl}`,
            credentials: "include",
            data: bodyFormData
        };
        const response = yield call(axios, options);
        yield put(sendOrderListSuccess(response.data)); //todo fix this part
    } catch (err) {
        console.log(err);
    }
}
function* confirmOrder({data}) {
    const bodyFormData = new FormData();
    bodyFormData.append('sl', `j,${defaultState.user},${defaultState.pass},sev`);
    bodyFormData.append('pc', data);
    try {
        const options = {
            method: "POST",
            url: `${constants.apiUrl}`,
            credentials: "include",
            data: bodyFormData
        };
        const response = yield call(axios, options);
        yield put(confirmOrderSuccess(response.data));
    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(GET_MANAGER_LIST, getManagerList);
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerList);
    yield takeLatest(SEND_ORDER_LIST, sendOrderList);
    yield takeLatest(CONFIRM_ORDER, confirmOrder);
};



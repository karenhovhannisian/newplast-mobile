import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {GET_CUSTOMER_LIST, GET_MANAGER_LIST, getCustomerListSuccess, getManagerListSuccess} from "../actions";

function* getManagerList({}) {
    try {
        const options = {
            method: "GET",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,mens`,
            credentials: "include",
        };
        const response = yield call(axios, options);
        console.log(response.data, 'response');
        yield put(getManagerListSuccess(response.data));
    } catch (err) {
        console.log(err);
    }
}

function* getCustomerList({}) {
    try {
        const options = {
            method: "GET",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,gynker`,
            credentials: "include",
        };
        const response = yield call(axios, options);
        console.log(response.data, 'response');
        yield put(getCustomerListSuccess(response.data));
    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(GET_MANAGER_LIST, getManagerList);
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerList);
};

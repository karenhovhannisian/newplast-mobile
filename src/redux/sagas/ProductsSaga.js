import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {GET_BALANCE, GET_PRICE, GET_PRODUCTS, getBalanceSuccess, getPriceSuccess, getProductsSuccess} from "../actions";
import cache from '../../Common/Cache';

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

function* getProducts({}) {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('sl', 'j,WKaren,wkaren,mxumb');
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php`,
            credentials: "include",
            data: bodyFormData,
            headers:{
                'Content-Type': "application/json",
            }
        };
        const response = yield call(axios, options);
      // yield cache.setItem("hello", response.data, function(err) {
      //     console.log(response.data, 'cacheresponse.data')
      // });
        yield put(getProductsSuccess(response.data));

    } catch (err) {
        console.log(err);
    }
}

function* getBalance({}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,${defaultState.user},${defaultState.pass},apr_mnacs, where fSTORAGE='111' and psize='16' and p.products_id='1'`,
            credentials: "include",
            headers:{
                'Content-Type': "application/json",
            }
        };
        const response = yield call(axios, options);

        yield put(getBalanceSuccess(response.data));

    } catch (err) {
        console.log(err);
    }
}

function* getPrice({value, productId}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,${defaultState.user},${defaultState.pass},apr_sgin, where psize=${value} and p.products_id=${productId}`,
            credentials: "include",
            headers:{
                'Content-Type': "application/json",
            }
        };
        const response = yield call(axios, options);
        yield put(getPriceSuccess(response.data[0].gin));

    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(GET_PRODUCTS, getProducts);
    yield takeLatest(GET_BALANCE, getBalance);
    yield takeLatest(GET_PRICE, getPrice);
};


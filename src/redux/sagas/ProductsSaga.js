import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {GET_BALANCE, GET_PRICE, GET_PRODUCTS, getBalanceSuccess, getPriceSuccess, getProductsSuccess} from "../actions";
import cache from '../../Common/Cache';


function* getProducts({}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,mxumb`,
            credentials: "include",
            headers:{
                'Content-Type': "application/json",
            }
        };
        const response = yield call(axios, options);
      yield cache.setItem("hello", response.data, function(err) {
      });
        yield put(getProductsSuccess());

    } catch (err) {
        console.log(err);
    }
}

function* getBalance({}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_mnacs, where fSTORAGE='111' and psize='16' and p.products_id='1'`,
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
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_sgin, where psize=${value} and p.products_id=${productId}`,
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


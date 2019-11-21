import {all} from "redux-saga/effects";
import sendDataSaga from "./AuthSaga";
import ProductsSaga from "./ProductsSaga";
import OrderSaga from "./OrderSaga";

export default function* rootSaga() {
    yield all([
        sendDataSaga(),
        ProductsSaga(),
        OrderSaga()
    ]);
}

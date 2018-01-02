
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import {LOGIN_REQUEST} from './actions'
export const API_LOGIN = 'https://api-dev.terra-utm.com/v1/login';

function * Login (action) {
    console.log('dmdmd')
    try {
        const data = yield call(API_LOGIN);
        yield put({ type: LOGIN_REQUEST, data, payload: action.payload.email });
    } catch (e) {
        yield put({ type: LOGIN_REQUEST, payload: e.message });
    }
}

/**
 * Listen when call action FLIGHT_FETCH_REQUEST.
 */
function * watchLoginRequest () {
    yield takeEvery(LOGIN_REQUEST, Login)
}

export const sagasUser = [
    fork(watchLoginRequest),
]

import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore'

// helpers
import { login as loginApi, logout as logoutApi } from '../../helpers/api/auth'

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions'

// constants
import { AuthActionTypes } from './constants'

interface UserData {
	payload: {
		username: string
		password: string
		fullname: string
		email: string
	}
	type: string
}

const api = new APICore()

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { email, password } }: UserData): SagaIterator {
	try {
		const response = yield call(loginApi, { email, password })
		const user = response.data
		// NOTE - You can change this according to response format from your api
		api.setLoggedInUser(user)
		setAuthorization(user['token'])
		yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error))
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
	try {
		// yield call(logoutApi)
		// api.setLoggedInUser(null)
		setAuthorization(null)
		yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error))
	}
}


export function* watchLoginUser() {
	yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}

export function* watchLogout() {
	yield takeEvery(AuthActionTypes.LOGOUT_USER, logout)
}


function* authSaga() {
	yield all([fork(watchLoginUser), fork(watchLogout)])
}

export default authSaga

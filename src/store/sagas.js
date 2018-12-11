import { takeLatest } from 'redux-saga/effects'

// Actions
import { GALLERY } from 'pages/gallery/actions'
import { LOGIN } from 'pages/login/actions'
import { ME, REFRESH, LOGOUT } from 'components/atoms/protected/actions'

// Sagas
import gallerySaga from 'pages/gallery/sagas'
import loginSaga from 'pages/login/sagas'
import {
  meSaga,
  refreshSaga,
  logoutSaga,
} from 'components/atoms/protected/sagas'


export default function* greenSaga() {
  yield takeLatest(GALLERY, gallerySaga)
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
  yield takeLatest(ME, meSaga)
  yield takeLatest(REFRESH, refreshSaga)
}

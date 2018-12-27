import { takeLatest } from 'redux-saga/effects'

// Actions
import { BLOG_DETAIL, BLOG_DETAIL_EDIT } from 'pages/blog-detail/actions'
import { BLOG_ADD, BLOG_DELETE, BLOG_LIST } from 'pages/blog-list/actions'
import { GALLERY } from 'pages/gallery/actions'
import { LOGIN } from 'pages/login/actions'
import { ME, REFRESH, LOGOUT } from 'components/atoms/protected/actions'

// Sagas
import { blogDetailSaga, blogDetailEditSaga } from 'pages/blog-detail/sagas'
import { blogAddSaga, blogDeleteSaga, blogListSaga } from 'pages/blog-list/sagas'
import gallerySaga from 'pages/gallery/sagas'
import loginSaga from 'pages/login/sagas'
import {
  meSaga,
  refreshSaga,
  logoutSaga,
} from 'components/atoms/protected/sagas'


export default function* greenSaga() {
  yield takeLatest(BLOG_ADD, blogAddSaga)
  yield takeLatest(BLOG_DELETE, blogDeleteSaga)
  yield takeLatest(BLOG_DETAIL, blogDetailSaga)
  yield takeLatest(BLOG_DETAIL_EDIT, blogDetailEditSaga)
  yield takeLatest(BLOG_LIST, blogListSaga)
  yield takeLatest(GALLERY, gallerySaga)
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
  yield takeLatest(ME, meSaga)
  yield takeLatest(REFRESH, refreshSaga)
}

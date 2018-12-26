import { call, put } from 'redux-saga/effects'
import BlogDetailService from './service'
import {
  BLOG_DETAIL_SUCCESS,
  BLOG_DETAIL_FAILURE,
  BLOG_DETAIL_EDIT_SUCCESS,
  BLOG_DETAIL_EDIT_FAILURE,
} from './actions'


export function* blogDetailSaga(action) {
  try {
    const result = yield call(
      BlogDetailService.blogDetail,
      action.year,
      action.month,
      action.day,
      action.slug,
    )
    yield put({ type: BLOG_DETAIL_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_DETAIL_FAILURE, error })
  }
}


export function* blogDetailEditSaga(action) {
  try {
    const result = yield call(
      BlogDetailService.blogDetailEdit,
      action.year,
      action.month,
      action.day,
      action.slug,
      action.data,
    )
    yield put({ type: BLOG_DETAIL_EDIT_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_DETAIL_EDIT_FAILURE, error })
  }
}

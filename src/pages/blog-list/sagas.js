import { call, put } from 'redux-saga/effects'
import BlogListService from './service'
import {
  BLOG_ADD_SUCCESS,
  BLOG_ADD_FAILURE,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAILURE,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
} from './actions'


export function* blogAddSaga(action) {
  try {
    const result = yield call(BlogListService.blogAdd, action.title)
    yield put({ type: BLOG_ADD_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_ADD_FAILURE, error })
  }
}


export function* blogDeleteSaga(action) {
  try {
    const result = yield call(
      BlogListService.blogDelete,
      action.year,
      action.month,
      action.day,
      action.slug,
    )
    yield put({ type: BLOG_DELETE_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_DELETE_FAILURE, error })
  }
}


export function* blogListSaga(action) {
  try {
    const result = yield call(BlogListService.blogList, action.page)
    yield put({ type: BLOG_LIST_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_LIST_FAILURE, error })
  }
}

import { call, put } from 'redux-saga/effects'
import BlogListService from './service'
import {
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
} from './actions'


export function* blogListSaga(action) {
  try {
    const result = yield call(BlogListService.blogList, action.page)
    yield put({ type: BLOG_LIST_SUCCESS, result })
  } catch (error) {
    yield put({ type: BLOG_LIST_FAILURE, error })
  }
}

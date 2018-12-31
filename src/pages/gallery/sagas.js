import { call, put } from 'redux-saga/effects'
import GalleryService from './service'
import { GALLERY_SUCCESS, GALLERY_FAILURE } from './actions'


export default function* gallerySaga(action) {
  try {
    const result = yield call(
      GalleryService.album,
      action.album,
      action.page,
      action.year,
    )
    yield put({ type: GALLERY_SUCCESS, result })
  } catch (error) {
    yield put({ type: GALLERY_FAILURE, error })
  }
}

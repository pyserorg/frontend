import {
  GALLERY,
  GALLERY_SUCCESS,
  GALLERY_FAILURE,
  GALLERY_RESET,
} from './actions'


export default function galleryReducer(state = {}, action) {
  switch (action.type) {
    case GALLERY:
      return {
        ...state,
        pending: true,
        error: null,
        status: null,
      }
    case GALLERY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        result: action.result,
        status: 200,
      }
    case GALLERY_FAILURE: {
      const error = action.error.response.data.message
      const { status } = action.error.response.status
      return {
        ...state,
        error,
        pending: false,
        status,
      }
    }
    case GALLERY_RESET:
      return {
        ...state,
        error: null,
        pending: false,
        status: null,
      }
    default:
      return state
  }
}

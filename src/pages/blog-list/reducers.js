import {
  BLOG_LIST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
  BLOG_LIST_RESET,
} from './actions'


export function blogListReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_LIST:
      return {
        ...state,
        pending: true,
        error: null,
        status: null,
      }
    case BLOG_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        result: action.result,
        status: 200,
      }
    case BLOG_LIST_FAILURE: {
      return {
        ...state,
        error: action.error.response.data.message,
        panding: false,
        status: action.error.response.status,
      }
    }
    case BLOG_LIST_RESET: {
      return {
        ...state,
        error: null,
        pending: false,
        status: null,
      }
    }
    default:
      return state
  }
}

import {
  BLOG_DETAIL,
  BLOG_DETAIL_SUCCESS,
  BLOG_DETAIL_FAILURE,
  BLOG_DETAIL_RESET,
  BLOG_DETAIL_EDIT,
  BLOG_DETAIL_EDIT_SUCCESS,
  BLOG_DETAIL_EDIT_FAILURE,
  BLOG_DETAIL_EDIT_RESET,
} from './actions'


export function blogDetailReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_DETAIL:
      return {
        ...state,
        pending: true,
        error: null,
        status: null,
      }
    case BLOG_DETAIL_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        result: action.result,
        status: 200,
      }
    case BLOG_DETAIL_FAILURE: {
      return {
        ...state,
        error: action.error.response.data.message,
        panding: false,
        status: action.error.response.status,
      }
    }
    case BLOG_DETAIL_RESET: {
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


export function blogDetailEditReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_DETAIL_EDIT:
      return {
        ...state,
        pending: true,
        error: null,
        status: null,
      }
    case BLOG_DETAIL_EDIT_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        result: action.result,
        status: 200,
      }
    case BLOG_DETAIL_EDIT_FAILURE: {
      return {
        ...state,
        error: action.error.response.data.message,
        panding: false,
        status: action.error.response.status,
      }
    }
    case BLOG_DETAIL_EDIT_RESET: {
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

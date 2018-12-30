import {
  CFS_FOCUS,
  CFS_FOCUS_RESET,
} from './actions'


export default function cfsFocusReducer(state = {}, action) {
  switch (action.type) {
    case CFS_FOCUS:
      return {
        ...state,
        name: action.name,
      }
    case CFS_FOCUS_RESET: {
      return {
        ...state,
        result: null,
      }
    }
    default:
      return state
  }
}

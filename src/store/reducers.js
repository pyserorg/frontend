import { combineReducers } from 'redux'

// atoms
import {
  authReducer,
  logoutReducer,
  meReducer,
  refreshReducer,
} from 'components/atoms/protected/reducers'

// pages
import { blogDetailReducer, blogDetailEditReducer } from 'pages/blog-detail/reducers'
import { blogListReducer } from 'pages/blog-list/reducers'
import galleryReducer from 'pages/gallery/reducers'
import loginReducer from 'pages/login/reducers'

// templates
import errorReducer from 'templates/empty/reducers'
import titleReducer from 'templates/default/reducers'

export default combineReducers({
  auth: authReducer,
  blogDetail: blogDetailReducer,
  blogDetailEdit: blogDetailEditReducer,
  blogList: blogListReducer,
  error: errorReducer,
  gallery: galleryReducer,
  login: loginReducer,
  logout: logoutReducer,
  me: meReducer,
  refresh: refreshReducer,
  title: titleReducer,
})

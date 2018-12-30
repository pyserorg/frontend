import { combineReducers } from 'redux'

// atoms
import {
  authReducer,
  logoutReducer,
  meReducer,
  refreshReducer,
} from 'components/atoms/protected/reducers'

// organisms
import cfsFocusReducer from 'components/organisms/price-box/reducers'

// pages
import { blogDetailReducer, blogDetailEditReducer } from 'pages/blog-detail/reducers'
import { blogAddReducer, blogDeleteReducer, blogListReducer } from 'pages/blog-list/reducers'
import galleryReducer from 'pages/gallery/reducers'
import loginReducer from 'pages/login/reducers'

// templates
import errorReducer from 'templates/empty/reducers'
import titleReducer from 'templates/default/reducers'

export default combineReducers({
  auth: authReducer,
  blogAdd: blogAddReducer,
  blogDelete: blogDeleteReducer,
  blogDetail: blogDetailReducer,
  blogDetailEdit: blogDetailEditReducer,
  blogList: blogListReducer,
  cfsFocus: cfsFocusReducer,
  error: errorReducer,
  gallery: galleryReducer,
  login: loginReducer,
  logout: logoutReducer,
  me: meReducer,
  refresh: refreshReducer,
  title: titleReducer,
})

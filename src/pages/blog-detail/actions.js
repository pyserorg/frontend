export const BLOG_DETAIL = 'BLOG_DETAIL'
export const BLOG_DETAIL_SUCCESS = 'BLOG_DETAIL_SUCCESS'
export const BLOG_DETAIL_FAILURE = 'BLOG_DETAIL_FAILURE'
export const BLOG_DETAIL_RESET = 'BLOG_DETAIL_RESET'
export const BLOG_DETAIL_EDIT = 'BLOG_DETAIL_EDIT'
export const BLOG_DETAIL_EDIT_SUCCESS = 'BLOG_DETAIL_EDIT_SUCCESS'
export const BLOG_DETAIL_EDIT_FAILURE = 'BLOG_DETAIL_EDIT_FAILURE'
export const BLOG_DETAIL_EDIT_RESET = 'BLOG_DETAIL_EDIT_RESET'


export function requestBlogDetail(year, month, day, slug) {
  return {
    year,
    month,
    day,
    slug,
    type: BLOG_DETAIL,
  }
}


export function requestBlogDetailEdit(year, month, day, slug, data) {
  return {
    year,
    month,
    day,
    slug,
    data,
    type: BLOG_DETAIL_EDIT,
  }
}


export function requestBlogDetailReset() {
  return {
    type: BLOG_DETAIL_RESET,
  }
}


export function requestBlogDetailEditReset() {
  return {
    type: BLOG_DETAIL_EDIT_RESET,
  }
}


export default {
  requestBlogDetail,
  requestBlogDetailEdit,
  requestBlogDetailReset,
  requestBlogDetailEditReset,
}

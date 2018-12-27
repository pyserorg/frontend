export const BLOG_LIST = 'BLOG_LIST'
export const BLOG_LIST_SUCCESS = 'BLOG_LIST_SUCCESS'
export const BLOG_LIST_FAILURE = 'BLOG_LIST_FAILURE'
export const BLOG_LIST_RESET = 'BLOG_LIST_RESET'
export const BLOG_ADD = 'BLOG_ADD'
export const BLOG_ADD_SUCCESS = 'BLOG_ADD_SUCCESS'
export const BLOG_ADD_FAILURE = 'BLOG_ADD_FAILURE'
export const BLOG_ADD_RESET = 'BLOG_ADD_RESET'


export function requestBlogList(page = 0) {
  return {
    page,
    type: BLOG_LIST,
  }
}


export function requestBlogListReset() {
  return {
    type: BLOG_LIST_RESET,
  }
}


export function requestBlogAdd(title) {
  return {
    title,
    type: BLOG_ADD,
  }
}


export function requestBlogAddReset() {
  return {
    type: BLOG_ADD_RESET,
  }
}


export default {
  requestBlogAdd,
  requestBlogAddReset,
  requestBlogList,
  requestBlogListReset,
}

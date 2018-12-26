export const BLOG_LIST = 'BLOG_LIST'
export const BLOG_LIST_SUCCESS = 'BLOG_LIST_SUCCESS'
export const BLOG_LIST_FAILURE = 'BLOG_LIST_FAILURE'
export const BLOG_LIST_RESET = 'BLOG_LIST_RESET'


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


export default {
  requestBlogList,
  requestBlogListReset,
}

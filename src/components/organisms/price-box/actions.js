export const CFS_FOCUS = 'CFS_FOCUS'
export const CFS_FOCUS_RESET = 'CFS_FOCUS_RESET'


export function requestCfSFocus(name) {
  return {
    name,
    type: CFS_FOCUS,
  }
}


export default {
  requestCfSFocus,
}

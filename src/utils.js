import store from 'store'


export const API_ROOT = '/api/v0'
let timeout;


export function getCookie(name) {
  var value = "; " + document.cookie
  var parts = value.split("; " + name + "=")
  if (parts.length === 2) return parts.pop().split(";").shift()
}


const refreshTimeout = () => {
  const accessTimeout = store.auth.accessExpire === 0
    ? 0
    : (store.auth.accessExpire - 5) * 1000
  timeout = setTimeout(refreshExecute, accessTimeout)
}


export const refreshExecute = async (timeout) => {
  await store.auth.refresh()
  if (store.auth.status === 200) {
    store.me.fetch()
    if (2 * store.auth.accessExpire > store.auth.refreshExpire) {
      store.error.message = 'Refresh token is soon to expire! Please go to login page.'
      store.error.open = true
    }
    refreshTimeout()
  }
}


export const timeoutClear = () => {
  clearTimeout(timeout)
  timeout = null
}

export const handleEdit = (item, edit, component) => () => {
  handleOver(item, false, component)()
  if (edit) {
    component.setState(prevState => ({
      edit: item,
      [`${item}Old`]: prevState[item],
    }))
  } else {
    component.setState({ edit: null })
  }
}


export const handleOver = (item, over, component) => () => {
  if (over) {
    component.setState({ over: item })
  } else {
    component.setState({ over: null })
  }
}


export const handleValue = (item, component, reset = false) => (event) => {
  if (reset) {
    component.setState(prevState => ({
      [item]: prevState[`${item}Old`],
      [`${item}Old`]: null,
    }))
    handleEdit(item, false, component)()
  } else {
    component.setState({ [item]: event.target.value })
  }
}


export const linkTarget = (url) => {
  if (url.length < 4) {
    return '_blank'
  }
  if (url[0] === '/') {
    if (url[1] !== '/') {
      return ''
    }
  }
  return '_blank'
}

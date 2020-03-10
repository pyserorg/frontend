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

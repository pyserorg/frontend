export default () => {
  const styles = {
    root: {
      marginBottom: 30,
      width: '25%',
    },
  }
  if (window.innerWidth < 700) {
    styles.root.width = 'calc(100% - 90px)'
  }
  return styles
}

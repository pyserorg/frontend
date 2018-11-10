export default () => {
  const styles = {
    root: {
      marginBottom: 30,
      width: '25%',
    },

    name: {
      marginBottom: 10,
    },

    media: {
      height: 50,
      width: 50,
      backgroundSize: '100% 100%',
    },
  }
  if (window.innerWidth < 700) {
    styles.root.width = 'calc(100% - 90px)'
  }
  return styles
}

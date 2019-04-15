const priceBox = {
  width: '100%',
  margin: 5,
  textAlign: 'left',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
}


export default (backgroundColor = null, resolution = {}) => {
  console.log(resolution)
  const styles = {
    price: {
      ...priceBox,
      maxHeight: resolution.width < 600 ? 56 : 64,
      focused: {
        ...priceBox,
        maxHeight: 800,
      },
    },

    content: {
      padding: 40,
    },

    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      color: 'rgba(0, 0, 0, 0.4)',
      fontWeight: 'bold',
    },
  }
  if (backgroundColor) {
    styles.toolbar.backgroundColor = backgroundColor
  }
  return styles
}

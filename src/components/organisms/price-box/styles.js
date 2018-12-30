const priceBox = {
  width: '100%',
  height: 500,
  margin: 5,
  textAlign: 'left',
}


export default (theme, color = null) => {
  const styles = {
    price: {
      ...priceBox,
      maxHeight: 65,
      overflow: 'hidden',
      focused: {
        ...priceBox,
        maxHeight: 400,
        overflow: 'auto',
      },
    },

    content: {
      padding: 40,
    },

    toolbar: {
    },
  }
  if (color) {
    styles.toolbar.backgroundColor = color
  }
  return styles
}

function getStyles(theme, resolution) {
  const styles = {
    link: {
      textDecoration: 'none',
    },

    root: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      paddingTop: 20,
      paddingBottom: 20,
    },

    card: {
      maxWidth: 300,
      marginBottom: 10,
    },

    media: {
      height: 340,
    },
  }
  if (resolution.width > 900) {
    styles.root.flexDirection = 'row'
  } else {
    styles.root.flexDirection = 'column'
    styles.card.maxWidth = '100%'
  }
  return styles
}


export default getStyles

const talks = {
  width: '100%',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const talksWide = {
  ...talks,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'stretch',
}


function getStyles(theme, over) {
  const styles = {
    ...theme,

    root: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      paddingTop: 20,
      paddingBottom: 20,
    },

    card: {
	  maxWidth: 300,
	},

    media: {
      height: 340,
    },
  }
  if (window.innerWidth > 700) {
    styles.talks = talksWide
  } else {
    styles.talks = talks
  }
  return styles
}


export default getStyles

const fontSize = 48
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
  const alpha = over ? 0.1 : 0.02
  const styles = {
    ...theme,

    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    title: {
      fontSize: `${fontSize}px`,
      color: theme.palette.primary.main,
      cursor: 'pointer',
      background: `rgba(255, 255, 255, ${alpha})`,
      padding: 5,
      borderRadius: 10,
      small: {
        fontSize: '25px',
        marginTop: 10,
        color: '#888',
      },
      middle: {
        fontSize: '30px',
        marginTop: 10,
        color: '#aaa',
      },
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

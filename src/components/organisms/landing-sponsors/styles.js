const title = {
  fontSize: '50px',
  color: '#aaa',
  marginBottom: 30,
  marginTop: 80,
  textAlign: 'center',
}

const iconMarginSide = 10
const iconMarginSideTotal = 2 * iconMarginSide

const iconWidth = {
  width: `calc(100% - ${iconMarginSideTotal}px)`,
  marginLeft: iconMarginSide,
  marginRight: iconMarginSide,
  marginBottom: 10,
}


function getStyles(theme) {
  const styles = {
    ...theme,

    root: {
      minHeight: '100vh',
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: 50,
    },

    sponsors: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },

    title: {
      ...title,
      big: {
        ...title,
        fontSize: '80px',
      },
      small: {
        fontSize: '25px',
        marginTop: 30,
        color: '#888',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },

    icon: {
      ...iconWidth,
      maxWidth: 500,
      gold: {
        ...iconWidth,
        maxWidth: 250,
      },
      silver: {
        ...iconWidth,
        maxWidth: 250,
      },
      bronze: {
        ...iconWidth,
        maxWidth: 200,
      },
      copper: {
        ...iconWidth,
        maxWidth: 100,
      },
    },

    element: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    button: {
	  marginTop: 20,
      width: 200,
    },
  }
  if (window.innerWidth < 700) {
    styles.element.flexDirection = 'column'
  }
  return styles;
}

export default getStyles

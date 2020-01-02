const title = {
  fontSize: '50px',
  color: '#aaa',
  marginBottom: 30,
  marginTop: 80,
  textAlign: 'center',
}

const iconMarginSide = 10

const iconWidth = {
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
        textAlign: 'center',
      },
    },

    icon: {
      ...iconWidth,
      width: 500,
      diamond: {
        ...iconWidth,
        width: 450,
      },
      gold: {
        ...iconWidth,
        width: 300,
      },
      silver: {
        ...iconWidth,
        width: 250,
      },
      bronze: {
        ...iconWidth,
        width: 200,
      },
      copper: {
        ...iconWidth,
        width: 100,
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

    link: {
      textDecoration: 'none',
    },
  }
  if (window.innerWidth < 700) {
    styles.element.flexDirection = 'column'
  }
  return styles;
}

export default getStyles

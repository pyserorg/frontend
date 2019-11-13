const titleBase = {
  marginLeft: 20,
}

const color = {
  color: '#555'
}


export default {
  root: {
    ...color,
    padding: 20,
    minHeight: 'calc(100vh - 65px - 40px)',
  },

  title: {
    ...titleBase,
    marginTop: 50,
    main: {
      ...titleBase,
      marginBottom: 30,
    },
  },

  diamond: {
    ...color,
  },

  gold: {
    ...color,
    backgroundColor: '#d3af37',
  },

  silver: {
    ...color,
    backgroundColor: '#adb3c1',
  },

  bronze: {
    ...color,
    backgroundColor: '#ffb66e',
  },

  copper: {
    ...color,
    backgroundColor: '#ffbd8e',
  },

  description: {
    marginTop: 10,
    marginLeft: 10,
  },

  form: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 600,
    },
  },

  button: {
    marginTop: 20,
  },
}

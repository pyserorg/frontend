const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}


export default {
  root: {
    minHeight: 'calc(100vh - 65px - 40px)',
    padding: 20,
  },

  picture: {
    width: 1.6,
    height: 1,
  },

  file: {
    input: {
      display: 'none',
    },
  },

  upload: {
    button: {
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
  },

  carousel: {
    height: '100%',
    width: '100%',
    content: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      display: 'grid',
      gridTemplateColumns: '50px auto 50px',
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    navigation: {
      ...center,
      color: '#555',
      fontSize: 48,
      cursor: 'pointer',
    },
    close: {
      position: 'absolute',
      right: 10,
      top: 0,
      fontSize: 48,
      cursor: 'pointer',
      color: '#555',
    },
  },

  dialog: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}

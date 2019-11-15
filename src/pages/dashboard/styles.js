const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


export default {
  root: {
    ...center,
    flexDirection: 'column',
    height: 'calc(100vh - 64px - 40px)',
    padding: 20,
  },

  content: {
    ...center,
    flexDirection: 'row',
  },

  talks: {
    marginTop: 20,
    box: {
      marginBottom: 10,
    },
  },

  button: {
    margin: 20,
  },
}

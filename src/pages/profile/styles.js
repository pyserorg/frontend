const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


export default {
  root: {
    display: 'block',
    minHeight: 'calc(100vh - 65px - 40px)',
    padding: 20,
    backgroundColor: 'white',
  },

  item: {
    marginBottom: 5,
    backgroundColor: '#eee',
  },

  details: {
    marginRight: 20,
  },

  page: {
    marginLeft: 10,
    marginRight: 10,
  },

  center: {
    ...center,
  },

  avatar: {
    width: 100,
    height: 100,
    marginRight: 20,
  },

  inputs: {
    flex: 1,
    marginBottom: 20,
  },

  h1: {
    marginBottom: 30,
    color: '#3f51b5',
    small: {
      margin: 0,
    },
    textAlign: 'center',
  },

  form: {
    display: 'flex',
  },

  button: {
    marginLeft: 10,
    width: 80,
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    button: {
      margin: 10,
      width: 100,
      height: 40,
    },
  },

  content: {
    display: 'flex',
  },
}

const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


export default {
  root: {
    padding: 20,
    minHeight: 'calc(100vh - 65px - 40px)',
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  date: {
    fontSize: '0.8em',
    color: '#777',
  },

  image: {
    float: 'left',
    height: 100,
    width: 100,
  },

  button: {
    ...center,
    marginTop: 20,
  },

  title: {
    display: 'inline',
  },
}

const organizers = {
  display: 'grid',
  gridGap: 10,
  padding: 20,
}


export default (resolution) => ({
  root: {
    ...organizers,
    gridTemplateColumns: resolution.width > 600 ? 'auto auto' : 'auto',
    gridTemplateRows: resolution.width <= 600 ? 'auto auto' : 'auto',
  },

  title: {
    fontSize: 50,
    color: '#aaa',
    marginBottom: 40,
  },

  logo: {
    height: 100,
    marginRight: 40,
    marginLeft: 40,
  },

  organizer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  send: {
    marginTop: 20,
  },
})

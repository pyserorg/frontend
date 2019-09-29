const titleBase = {
  marginLeft: 20,
};


export default {
  root: {
    padding: 20,
    minHeight: 'calc(100vh - 65px - 40px)',
  },

  paragraph: {
    color: 'gray',
    marginTop: 10,
    marginBottom: 10,
    textIndent: 10,
  },

  title: {
    ...titleBase,
    marginTop: 50,
    main: {
      ...titleBase,
      marginBottom: 30,
    },
  },
}

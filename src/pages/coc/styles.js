const titleBase = {
  marginLeft: 20,
};


export default {
  root: {
    padding: 20,
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

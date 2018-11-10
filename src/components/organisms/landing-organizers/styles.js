export default function getStyles(theme, height) {
  const styles = {
    ...theme,

    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 10,
    },

    title: {
      fontSize: theme.landing.title.fontSize,
      color: '#aaa',
      marginBottom: 40,
    },

    logo: {
      height: 100,
      marginRight: 40,
      marginLeft: 40,
    },
  };
  return styles
}

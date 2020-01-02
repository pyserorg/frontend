import moment from 'moment'


export default (talk) => {
  const span = talk.duration / 5
  const styles = {
    root: {
      gridColumnStart: 'column-hall',
      gridRow: `row-${moment(talk.start).format('HH-mm')} / span ${span}`,
      backgroundColor: '#f5f5f5',
      padding: 20,
    },

    link: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'black',
    },
  }
  return styles
}

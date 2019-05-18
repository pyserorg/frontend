import moment from 'moment'


export default (talk) => {
  const styles = {
    root: {
      gridColumnStart: 'column-hall',
      gridRowStart: `row-${moment(talk.start).format('HH-mm')}`,
      gridRowEnd: `row-${moment(talk.end).format('HH-mm')}`,
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

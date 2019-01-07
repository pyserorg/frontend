import moment from 'moment'


export default (talk) => {
  const styles = {
    root: {
      padding: 10,
      textAlign: 'center',
      gridColumnStart: `column-${talk.hall}`,
      gridRowStart: `row-${moment(talk.start).format('HH-mm')}`,
      gridRowEnd: `row-${moment(talk.end).format('HH-mm')}`,
      backgroundColor: '#f5f5f5',
    },
  }
  return styles
}

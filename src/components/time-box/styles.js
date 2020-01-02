export default (time, end) => {
  const styles = {
    root: {
      textAlign: 'center',
      gridColumnStart: end ? 'column-time-end' : 'column-time-start',
      gridRowStart: `row-${time.format('HH-mm')}`,
      border: 1,
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderColor: '#dadada',
    },
  }
  return styles
}

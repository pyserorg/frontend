import moment from 'moment'


const defaultResult = {
  root: {
    padding: 20,
    minHeight: 'calc(100vh - 65px - 40px)',
  },
}


export default (talks) => {
  let start = null
  let end = null
  talks.data.forEach(talk => {
    const talkStart = moment(talk.start)
    const talkEnd = moment(talk.end)
    if (start === null || talkStart.isBefore(start)) {
      start = talkStart
    }
    if (end === null || talkEnd.isBefore(end)) {
      end = talkEnd
    }
  })
  if (start && end) {
    // const duration = end.diff(start, 'minutes')
    const result = {
      ...defaultResult,

      schedule: {
        display: 'grid',
        gridTemplateRows: `[row-${start.format('HH-mm')}] auto`,
      },
    }
    for (let time = start.add(5, 'minutes'); time <= end; time.add(5, 'minutes')) {
      if (time.minute() % 15 === 0) {
        console.log(time.minute())
      }
      result.schedule.gridTemplateRows += ` [row-${time.format('HH-mm')}] auto`
    }
    return result
  }
  return defaultResult
}

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
    const prestart = moment(start).add(-5, 'minutes')
    const result = {
      ...defaultResult,

      schedule: {
        display: 'grid',
        gridTemplateRows: `[row-${prestart.format('HH-mm')}] auto`,
      },
    }
    let rows = result.schedule.gridTemplateRows
    for (let time = start; time <= end; time.add(5, 'minutes')) {
      rows += ` [row-${time.format('HH-mm')}] auto`
    }
    rows += ` [row-${end.add(5, 'minutes').format('HH-mm')}]`
    result.schedule.gridTemplateRows = rows
    return result
  }
  return defaultResult
}

import moment from 'moment'


const text = {
  textAlign: 'justify',
  textJustify: 'inter-word',
  paddingLeft: 40,
  paddingRight: 40,
}


const defaultResult = {
  root: {
    padding: 20,
    minHeight: 'calc(100vh - 65px - 40px)',
    textAlign: 'center',
  },

  description: {
    ...text,
    marginBottom: 20,
  },

  bio: {
    ...text,
    marginBottom: 20,
  },

  switch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hall: {
    textTransform: 'capitalize',
  },
}


const rowHeight = 20
const titleHeight = 50
const timeColumnWidth = 50


export default (talks, theme) => {
  let start = null
  let end = null
  talks.data.forEach(talk => {
    const talkStart = moment(talk.start)
    const talkEnd = moment(talk.start).add(talk.duration, 'minutes')
    if (start === null || talkStart.isBefore(start)) {
      start = talkStart
    }
    if (end === null || talkEnd.isAfter(end)) {
      end = talkEnd
    }
  })
  if (start && end) {
    const preStart = moment(start).add(-5, 'minutes')
    const timeStart = `[column-time-start] ${timeColumnWidth}px`
    const content = ' [column-hall] auto'
    const timeEnd = ` [column-time-end] ${timeColumnWidth}px [column-end]`
    const result = {
      ...defaultResult,

      schedule: {
        display: 'grid',
        gridTemplateColumns: `${timeStart} ${content} ${timeEnd}`,
        gridTemplateRows: `[row-${preStart.format('HH-mm')}] ${titleHeight}px`,
      },

      title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    }
    let rows = result.schedule.gridTemplateRows
    let time
    for (time = start; time <= end; time = moment(time).add(5, 'minutes')) {
      rows += ` [row-${time.format('HH-mm')}] ${rowHeight}px`
    }
    rows += ` [row-${time.format('HH-mm')}]`
    result.schedule.gridTemplateRows = rows
    return result
  }
  return defaultResult
}

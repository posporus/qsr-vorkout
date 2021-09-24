import moment from 'moment'

function duration(started:Date,ended:Date | false):string | undefined {
    if (ended) {
        const _started = moment(started)
        const _ended = moment(ended)
  
        const diff = _ended.diff(_started)
        const duration = moment.duration(diff, 'milliseconds')
        console.log(started, ended, diff, duration)
        return moment(
          duration.asMilliseconds()
        ).format('mm[m]ss[s]')
      } else {
        return undefined
      }
}

export default duration
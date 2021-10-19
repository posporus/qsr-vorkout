import { boot } from 'quasar/wrappers'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calendar from 'dayjs/plugin/calendar'
import weekday from 'dayjs/plugin/weekday'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs
  }
}

export default boot( ( { app }) => {
  dayjs.extend(duration)
  dayjs.extend(calendar)
  dayjs.extend(weekday)
  app.config.globalProperties.$dayjs = dayjs
})

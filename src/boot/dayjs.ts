import { boot } from 'quasar/wrappers'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs
  }
}

export default boot( ( { app }) => {
  dayjs.extend(duration)
  app.config.globalProperties.$dayjs = dayjs
})

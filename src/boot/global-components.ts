import { boot } from 'quasar/wrappers'
import * as globalComponents from 'src/global'

export default boot( ( {app} ) => {
  for (const [key,value] of Object.entries(globalComponents)) {
    app.component(key,value)
  }
})

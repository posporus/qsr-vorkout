import { boot } from 'quasar/wrappers'
import type { navigationDirection } from 'src/types'

export default boot(({ router }) => {
  router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    const navigationDirection: navigationDirection = {
      up: fromDepth < toDepth,
      down: fromDepth > toDepth,
      same: fromDepth === toDepth
    }
    to.meta.navigationDirection = navigationDirection
  })
})

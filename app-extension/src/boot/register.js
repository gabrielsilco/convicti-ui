import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-convicti-ui'

export default boot(({ app }) => {
  app.use(VuePlugin)
})

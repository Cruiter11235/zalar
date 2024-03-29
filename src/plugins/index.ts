import { type App } from 'vue'
import { flat } from '../utils'

const modules = import.meta.glob('./**/*.ts', { eager: true })
const flattedExports = flat(modules)
console.log(import.meta.env.VITE_BASE_URL)

export default {
  install (app: App) {
    flattedExports.forEach((exp: any) => {
      if (Object.prototype.hasOwnProperty.call(exp, 'install')) {
        app.use(exp)
      }
    })
  }
}
